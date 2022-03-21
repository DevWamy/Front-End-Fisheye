//Mettre le code JavaScript lié à la page photographer.html
const photographersData = async() => {
    const data = await fetch('./data/photographers.json');
    const mediaData = await data.json();
    const media = mediaData.media;
    return {photographersData: [...media]}
}

photographersData();