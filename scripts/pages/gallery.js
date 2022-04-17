//Récupération des medias dans le fichier .json
const getMedias = async() => {
    const data = await fetch('./data/photographers.json');
    const mediaData = await data.json();
    const media = mediaData.media;
    
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

    //Ici au clic, l'event s'affiche dans la console
    const displayLightBox = (event) => {
      console.log('clicked on a lightbox, event target ->', event.target);

    //Ici on récupère la source de l'image
      const imageSrc = event.target.currentSrc;
      console.log('image Src found ->', imageSrc);
    //Ici on affiche la source de l'image capturée
      const targetedImgFound = document.getElementById('targetedImg');
      console.log('targetedImgFound -> ', targetedImgFound);
    // targetedImg -> ID Of targeted image
      targetedImgFound.src = imageSrc;

    const element = document.getElementById("bigImg");
    console.log(element)
    const caroussel = element.classList.remove('hidden')
    console.log(caroussel)

    }
    

    myLightBoxes.forEach((figure) =>{
      console.log(figure);
      figure.addEventListener('click', displayLightBox)
    });

    }

    
  const initGalery = async () => {
    // Récupère les medias des photographes
    const { medias } = await getMedias();
    photographGaleryDisplay(medias);
    lightboxInit()
  }
  
  initGalery();

  