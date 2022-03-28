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
        console.log(mediasFilter, medias, identifier);
        mediasFilter.forEach((media) => {
            const photographerModelGalery = galeryFactory(media);
            const userGalery = photographerModelGalery.getUserGaleryDOM();
            photographGalery.appendChild(userGalery);    
      
    });
  };
  
  const initGalery = async () => {
    // Récupère les medias des photographes
    const { medias } = await getMedias();
    photographGaleryDisplay(medias);
  }
  
  initGalery();

  