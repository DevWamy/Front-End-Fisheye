const getPhotographers = async () => {
    const data = await fetch('./data/photographers.json');
    const jsonData = await data.json();
    const photographers = jsonData.photographers;
    return { photographers: [...photographers] };
};

const displayData = async (photographers) => {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

const init = async () => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
