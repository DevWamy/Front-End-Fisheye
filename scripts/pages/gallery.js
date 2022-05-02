let currentLightboxIndex = 0;
//Récupération des medias dans le fichier .json
const getMedias = async() => {
    const data = await fetch('./data/photographers.json');
    const mediaData = await data.json();
    const media = mediaData.media;
    console.log(media)
    return {medias: [...media]}
}
  
const searchMedias = new URLSearchParams(window.location.search);
const identifier = searchMedias.get('id');

  
    const photographGaleryDisplay = async (medias) => {
        const photographGalery = document.querySelector('.photograph_galery');
        const mediasFilter = medias.filter(
      (media) => media.photographerId === parseInt(identifier)
    );
        
        mediasFilter.forEach((media) => {
            const photographerModelGalery = galeryFactory(media);
            const userGalery = photographerModelGalery.getUserGaleryDOM();
            photographGalery.appendChild(userGalery);    
      
    });
  };
  
  const lightboxInit = () => {
    // Ici je récupère la section contenant les données qui nous intéressent
    let mediasToGet = document.querySelector('.photograph_galery')
    console.log(mediasToGet)
    // Ici je  récupère les images dans le tableau
    let myLightBoxes = document.querySelectorAll('figure');
    console.log(myLightBoxes)
    // Ici je transforme ce que je vient de recuperer en tableau
    let arrayLightBoxes = Array.from(myLightBoxes)
      console.log(arrayLightBoxes)

    //Ici au clic, l'event s'affiche dans la console
    const displayLightBox = (event, index) => {
      console.log('clicked on a lightbox, event target ->', event.target);

    //Ici on récupère la source de l'image
      const imageSrc = event.target.currentSrc;
      console.log('image Src found ->', imageSrc);

    //Ici on affiche la source de l'image capturée
      const targetedImgFound = document.getElementById('targetedImg');
      console.log('targetedImgFound -> ', targetedImgFound);

    // targetedImg -> ID Of targeted image
      targetedImgFound.src = imageSrc;

      //Ici on récupère la source de la video
      const videoSrc = event.target.currentSrc;
      console.log('video Src found ->', videoSrc);

    //Ici on affiche la source de la video capturée
      const targetedVideoFound = document.getElementById('targetedVideo');
      console.log('targetedVideoFound -> ', targetedVideoFound);

    // targetedVideo -> ID Of targeted video
      targetedVideoFound.src = videoSrc;

    //Apparition de la lightbox au clic
      const element = document.getElementById("bigImg");
      element.classList.remove('hidden')
      currentLightboxIndex = index
      //apparition du titre de l'image
      document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].querySelector('h4').innerText
    }

    myLightBoxes.forEach((figure, index) =>{
      //console.log(figure);
      figure.addEventListener('click',(event)=>{ displayLightBox(event, index)})
    });

    //BOUTON FERMETURE LIGHTBOX
    const closeBtn = document.querySelector(".lightboxClose");
    closeBtn.addEventListener("click", () => {
      document.querySelector(".lightbox").classList.add("hidden")
    });

    //ICI VIENT LE BOUTON NEXT
    //La balise de class lightboxNext est la variable nextBtn
    const nextBtn = document.querySelector(".lightboxNext")
        //Lors du clic sur le bouton suivant, on recupere la source de l'image suivante
      nextBtn.addEventListener("click", () => {
        currentLightboxIndex +=1
        //on affiche l'element +1 du tableau des elements lightbox
        if (arrayLightBoxes[currentLightboxIndex] === undefined){
          //Ici j'ai mis -1 sinon la première ne s'affichait pas
          currentLightboxIndex = 0
        }
        //si cet element a pour balise img ou video on recupere la source de cette image

        // SI IMAGE ->
        const imageElement = arrayLightBoxes[currentLightboxIndex].querySelector('img');

        // SI VIDEO ->
        const videoElement = arrayLightBoxes[currentLightboxIndex].querySelector('video')
        
        // -----
        //On affiche 
        console.log('getting image Element ->', { imageElement });
        if (imageElement){
          //Retrait de la classe hidden sur les images
          document.getElementById("targetedImg").classList.remove("hidden");
          //Ajout de la classe hidden sur les videos
          document.getElementById("targetedVideo").classList.add("hidden");
          //La source de l'element image est la source qui se trouve dans targetedIMG dans le HTML
          document.getElementById('targetedImg').src = imageElement.src
        } else {
          // Mode vidéo
          //Ce qui se trouve dans targetedVideo defini la variable targetedVideoElement
          const targetedVideoElement = document.getElementById("targetedVideo");
          //On retire la classe hidden de ce qui se trouve sur la vidéo parce quon a besoin que ca s'affiche
          targetedVideoElement.classList.remove("hidden");
          //On ajoute la classe hidden pour cacher les images
          document.getElementById("targetedImg").classList.add("hidden");

          console.log('got the video ->', { targetedVideoElement })
        
          console.log('videoElement -> ', { videoElement })
          //La source videoElement est la nouvelle source de la video
          const videoElementNewSource = videoElement.src;
          //On change l'attribut de la video capturée par la nouvelle source
          targetedVideoElement.setAttribute('src',videoElementNewSource)
        }

        // On incrémente l'index de un dans le tableau (donc une img en +)
        
        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].querySelector('h4').innerText
        //A la fin de toutes les images, on retourne à la première
      
      })
      console.log(nextBtn)

    //ICI VIENT LE BOUTON PREV
      const prevBtn = document.querySelector(".lightboxPrev")
      //Lors du clic sur le bouton precedent, on recupere la source de l'image precedente
      prevBtn.addEventListener("click", () => {
        //si cet element+1 a pour balise img on recupere la source de cette image
        currentLightboxIndex-=1
        if (arrayLightBoxes[currentLightboxIndex] === undefined){
          //Ici j'ai mis -1 sinon la première ne s'affichait pas a revoir
          currentLightboxIndex = arrayLightBoxes.length - 1
        }
        const imageElement = arrayLightBoxes[currentLightboxIndex].querySelector('img');
        

        // SI VIDEO ->
        const videoElement = arrayLightBoxes[currentLightboxIndex].querySelector('video')
        
        // -----
        //On affiche 
        console.log('getting image Element ->', { imageElement });
        if (imageElement){
          //Retrait de la classe hidden sur les images
          document.getElementById("targetedImg").classList.remove("hidden");
          //Ajout de la classe hidden sur les videos
          document.getElementById("targetedVideo").classList.add("hidden");
          //La source de l'element image est la source qui se trouve dans targetedIMG dans le HTML
          document.getElementById('targetedImg').src = imageElement.src
        } else {
          // Mode vidéo
          //Ce qui se trouve dans targetedVideo defini la variable targetedVideoElement
          const targetedVideoElement = document.getElementById("targetedVideo");
          //On retire la classe hidden de ce qui se trouve sur la vidéo parce quon a besoin que ca s'affiche
          targetedVideoElement.classList.remove("hidden");
          //On ajoute la classe hidden pour cacher les images
          document.getElementById("targetedImg").classList.add("hidden");

          console.log('got the video ->', { targetedVideoElement })
        
          console.log('videoElement -> ', { videoElement })
          //La source videoElement est la nouvelle source de la video
          const videoElementNewSource = videoElement.src;
          //On change l'attribut de la video capturée par la nouvelle source
          targetedVideoElement.setAttribute('src',videoElementNewSource)
        }
        /*
        else {
          //afficher video a l'ecran a la place de l'img (cacher img  ou balise a faire)
        }*/
        // On décrémente l'index de un dans le tableau (donc une img en -)
        
      
        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].querySelector('h4').innerText
        //Au debut de toutes les images, on retourne à la derniere
        

      })
      console.log(prevBtn)
    }

  const initGalery = async () => {
    // Récupère les medias des photographes
    const { medias } = await getMedias();
    photographGaleryDisplay(medias);
    lightboxInit()
  }
  
  initGalery();

  