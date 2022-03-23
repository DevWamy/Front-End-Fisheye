//Mettre le code JavaScript lié à la page photographer.html
//Récupération des medias dans le fichier .json
const photographersData = async() => {
    const data = await fetch('./data/photographers.json');
    const mediaData = await data.json();
    const media = mediaData.media;
    console.log(media)
    return {photographersData: [...media]}
}

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

console.log(photographersData());

//Récupération des données photographes dans le fichier .json
const havePhotographers = async () => {
    const data = await fetch('./data/photographers.json');
    const jsonData = await data.json();
    const photographers = jsonData.photographers;
    console.log(photographers)
    return { photographers: [...photographers] };
  };

  console.log(havePhotographers());
  