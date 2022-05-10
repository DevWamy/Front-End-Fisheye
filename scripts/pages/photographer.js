//Mettre le code JavaScript lié à la page photographer.html
//Récupération des medias dans le fichier .json

const getPhotoUsers = async () => {
  const data = await fetch('./data/photographers.json');
  const jsonData = await data.json();
  const photographers = jsonData.photographers;
  return { photographers: [...photographers] 
  };
};

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');
const photographerProfilDisplay = async (photographers) => {
  const photographerProfilContainer = document.querySelector(".photograph_header");
  
  photographers.forEach((photographer) => {
    if (photographer.id == id) {
      const photographerModelPage = photographerFactory(photographer);
      const userCardDOMPage = photographerModelPage.getUserCardDOMPage();
      photographerProfilContainer.appendChild(userCardDOMPage); 
    }
    
    });

  }
  
  const initPage = async () => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotoUsers();
    photographerProfilDisplay(photographers);

    
  }

  initPage();
