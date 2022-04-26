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

    //Apparition de la lightbox au clic
      const element = document.getElementById("bigImg");
      element.classList.remove('hidden')
      currentLightboxIndex = index
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
    const nextBtn = document.querySelector(".lightboxNext")
        //Lors du clic sur le bouton suivant, on recupere la source de l'image suivante
      nextBtn.addEventListener("click", () => {
        //on affiche l'element +1 du tableau des elements lightbox
        console.log(arrayLightBoxes[currentLightboxIndex+1])
        //si cet element a pour balise img on recupere la source de cette image
        if (arrayLightBoxes[currentLightboxIndex+1].querySelector('img')){
          document.getElementById('targetedImg').src = arrayLightBoxes[currentLightboxIndex+1].querySelector('img').src
        }
        else {
        //afficher video a l'ecran a la place de l'img (cacher img  ou balise a faire)
        }
        // On incrémente l'index de un dans le tableau (donc une img en +)
        currentLightboxIndex +=1
        const nextImage = arrayLightBoxes[currentLightboxIndex+1];
        console.log(nextImage)
        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].querySelector('h4').innerText
        //A la fin de toutes les images, on retourne à la première
      if (nextImage === undefined){
        //Ici j'ai mis -1 sinon la première ne s'affichait pas
        currentLightboxIndex = -1
      }
      })
      console.log(nextBtn)

    //ICI VIENT LE BOUTON PREV
      const prevBtn = document.querySelector(".lightboxPrev")
      //Lors du clic sur le bouton precedent, on recupere la source de l'image precedente
      prevBtn.addEventListener("click", () => {
        //si cet element+1 a pour balise img on recupere la source de cette image
        if (arrayLightBoxes[currentLightboxIndex-1].querySelector('img')){
        document.getElementById('targetedImg').src = arrayLightBoxes[currentLightboxIndex -1].querySelector('img').src
        }else {
          //afficher video a l'ecran a la place de l'img (cacher img  ou balise a faire)
        }
        // On décrémente l'index de un dans le tableau (donc une img en -)
        currentLightboxIndex -=1
        const prevImage = arrayLightBoxes[currentLightboxIndex-1];
        console.log(prevImage)
        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText = arrayLightBoxes[currentLightboxIndex].querySelector('h4').innerText
        //Au debut de toutes les images, on retourne à la derniere
        if (prevImage === undefined){
          //Ici j'ai mis -1 sinon la première ne s'affichait pas
          currentLightboxIndex = arrayLightBoxes.length-1
        }

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

  