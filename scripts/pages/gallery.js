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
        console.log(photographGalery)
        const mediasFilter = medias.filter(
      (media) => media.photographerId === parseInt(identifier)
    );
        //C'EST ICI QUE JE TRAVAILLE POUR LE COMPTEUR DE LIKE
        mediasFilter.forEach((media) => {
            const photographerModelGalery = galeryFactory(media);
            const userGalery = photographerModelGalery.getUserGaleryDOM();
            photographGalery.appendChild(userGalery); 
    });
      //Afficher les likes (nbre de likes et coeur)
      console.log(photographGalery.querySelectorAll("h5"))
      photographGalery.querySelectorAll("h5").forEach((like) =>{
      //console.log(like)
      //On recupère tous les spans qui se trouvent dans h5 avec un querySelectorAll 
      const spans = photographGalery.querySelectorAll('h5 > span')
      console.log(spans)
      //Lorsque l'on clique sur le coeur:
      like.addEventListener("click", ()=>{
        //On verifie que le like est cliqué
        console.log("like cliqué")
        //On affiche le nombre de like
        console.log(like.querySelector('span').innerText)
        //On incrémente les likes au clic
        numberOfLikes = like.querySelector('span').innerText++
        //On verifie en affichant
        console.log(numberOfLikes)
        //On crée un compteur avec chaque span
        let counter = like.querySelector('span').innerText
        //On l'affiche
        console.log(counter)
        //On crée une variable qui nous servira a additionner les valeurs
        let total = 0
        // On itère sur chaque span récupéré avec un forEach,
        // On transforme le textContent en nombre car c'est une string au départ
        // On additionne sa valeur au total
        spans.forEach(span => total += parseInt(span.textContent, 10))
        // On affiche la valeur totale  dans le DOM
        document.querySelector(".total").innerText = total
        
      }) 
    })
      const spans = document.querySelectorAll('h5 > span')
      console.log(spans)
      let total = 0
        // On itère sur chaque span récupéré avec un forEach,
        // On transforme le textContent en nombre car c'est une string au départ
        // On additionne sa valeur au total
        spans.forEach(span => total += parseInt(span.textContent, 10))
        document.querySelector(".total").innerText = total
        //On recupere le prix et on l'affiche sur la page
        document.querySelector(".price").innerText = document.querySelector("article h6").innerText
        document.querySelector(".name").innerText = document.querySelector("div h1").innerText
  };
  //Lightbox
  const lightboxInit = () => {
    // Ici je récupère la section contenant les données qui nous intéressent
    let mediasToGet = document.querySelector('.photograph_galery')
    console.log(mediasToGet)
    // Ici je  récupère les images dans le tableau
    let myLightBoxes = document.querySelectorAll('figure > div');
    console.log(myLightBoxes)
    // Ici je transforme ce que je vient de recuperer en tableau
    let arrayLightBoxes = Array.from(myLightBoxes)
      console.log(arrayLightBoxes)

    //Ici au clic, l'event s'affiche dans la console
    const displayLightBox = (event, index) => {
      console.log('clicked on a lightbox, event target ->', event.target , event.currentTarget);
    
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
      document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].parentElement.querySelector('h4').innerText
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
        //si l'element est indefini alors l'index courant vaut 0
          currentLightboxIndex = 0
        }
        //si cet element a pour balise img ou video on recupere la source de cette image

        // SI IMAGE ->
        const imageElement = arrayLightBoxes[currentLightboxIndex].querySelector('img');

        // SI VIDEO ->
        const videoElement = arrayLightBoxes[currentLightboxIndex].querySelector('video')
        
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
        
        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].parentElement.querySelector('h4').innerText
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
        //Au debut de toutes les images, on retourne à la derniere
        //si l'element est indefini alors l'index courant vaut la taille du tableau de la ligthbox - 1
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
      
        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].parentElement.querySelector('h4').innerText
        
      })
      console.log(prevBtn)
    }

  const initGalery = async () => {
    // Récupère les medias des photographes
    const { medias } = await getMedias();
    console.log(medias.sort((a,b) => {
      return a.likes - b.likes
    }))
    photographGaleryDisplay(medias);
    lightboxInit()
  }
  
  initGalery();

  