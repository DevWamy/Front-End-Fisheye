let currentLightboxIndex = 0;
//Récupération des medias dans le fichier .json
const getMedias = async () => {
    const data = await fetch('./data/photographers.json');
    const mediaData = await data.json();
    //On récupère les medias dans une constante
    const media = mediaData.media;
    //On retourne le tableau media qui se trouve dans medias
    return { medias: [...media] };
};

//TRI //
//On selectionne nos trois options
const currentOpt = document.querySelector('.currentOpt');
const option1 = document.querySelector('.opt1');
const option2 = document.querySelector('.opt2');
//On garde la valeur de l'option actuelle
let valKeeper = currentOpt.innerText;
//On recupère tous les éléments liens (sur lesquels on clique pour le tri)
const menuElements = document.querySelectorAll('.menu_deroulant a');
//Pour chachun d'eux
menuElements.forEach((element) => {
    //Lorsque l'on clique sur l'élément
    element.addEventListener('click', async (e) => {
        //On retire le comportement de la page par défaut
        e.preventDefault();
        //On récupère l'élément qui s'affiche sur la page dans une constante
        const label = element.innerText;
        //On remplace le 1er élement par le label
        currentOpt.innerText = element.innerText;
        element.innerText = valKeeper;
        valKeeper = currentOpt.innerText;

        //On récupère ce qui se trouve dans la galerie du photographe et on le met dans une constante
        const photographGalery = document.querySelector('.photograph_galery');
        //On vide la liste des médias
        photographGalery.innerHTML = '';
        //On récupère de nouveau la liste des médias
        const { medias } = await getMedias();
        //Si l'élément est de type likes
        if (currentOpt.innerText === 'Popularité') {
            //Alors on tri par popularité
            medias.sort((a, b) => {
                return a.likes - b.likes;
            });
        }
        //Si l'élément est de type date
        else if (currentOpt.innerText === 'Date') {
            //Alors on tri par date
            medias.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            console.log(medias);
        }
        //Si l'élément est de type title
        else {
            //Alors on tri par titre
            medias.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        }

        //On affiche les medias
        photographGaleryDisplay(medias);
        //On initialise la lightbox
        currentLightboxIndex = 0;
        lightboxInit();
    });
});

const searchMedias = new URLSearchParams(window.location.search);
const identifier = searchMedias.get('id');

const photographGaleryDisplay = async (medias) => {
    //On recupère les elements qui se trouvent dans la section de classe photograph_gallery que l'on met dans une constante
    const photographGalery = document.querySelector('.photograph_galery');

    const mediasFilter = medias.filter((media) => media.photographerId === parseInt(identifier));
    // COMPTEUR DE LIKE
    //Pour chaque media de mediasFilter
    mediasFilter.forEach((media) => {
        //On récupère le media qui se trouve dans la galeryFactory que l'on met dans une constante
        const photographerModelGalery = galeryFactory(media);
        //Et ici aussi
        const userGalery = photographerModelGalery.getUserGaleryDOM();
        //Puis on ajoute le userGallery à photographGallery
        photographGalery.appendChild(userGalery);
    });
    //Afficher les likes (nbre de likes et coeur)
    photographGalery.querySelectorAll('h5').forEach((like) => {
        //On recupère tous les spans qui se trouvent dans h5 avec un querySelectorAll
        const spans = photographGalery.querySelectorAll('h5 > span');
        //Lorsque l'on clique sur le coeur:
        like.addEventListener('click', () => {
            //On incrémente les likes au clic
            numberOfLikes = like.querySelector('span').innerText++;
            //On crée un compteur avec chaque span
            let counter = like.querySelector('span').innerText;
            //On l'affiche
            console.log(counter);
            //On crée une variable qui nous servira a additionner les valeurs
            let total = 0;
            // On itère sur chaque span récupéré avec un forEach,
            // On transforme le textContent en nombre car c'est une string au départ
            // On additionne sa valeur au total
            spans.forEach((span) => (total += parseInt(span.textContent, 10)));
            // On affiche la valeur totale  dans le DOM
            document.querySelector('.total').innerText = total;
        });
    });
    //On récupère ce qui se trouve dans le span de h5 dans une constante
    const spans = document.querySelectorAll('h5 > span');
    let total = 0;
    // On itère sur chaque span récupéré avec un forEach,
    // On transforme le textContent en nombre car c'est une string au départ
    // On additionne sa valeur au total
    spans.forEach((span) => (total += parseInt(span.textContent, 10)));
    document.querySelector('.total').innerText = total;
    //On recupere le prix et on l'affiche sur la page
    document.querySelector('.price').innerText = document.querySelector('article h6').innerText;
    document.querySelector('.name').innerText = document.querySelector('div h1').innerText;
};

//Lightbox
const lightboxInit = () => {
    // Ici on récupère la section contenant les données qui nous intéressent
    let mediasToGet = document.querySelector('.photograph_galery');
    // On récupère les images dans le tableau
    let myLightBoxes = document.querySelectorAll('figure > div');
    // Ici on transforme ce que je vient de recuperer en tableau
    let arrayLightBoxes = Array.from(myLightBoxes);

    //Au clic, l'event s'affiche dans la console
    const displayLightBox = (event, index) => {
        //Ici on récupère la source de l'image
        const imageSrc = event.target.currentSrc;
        //Ici on affiche la source de l'image capturée
        const targetedImgFound = document.getElementById('targetedImg');
        // targetedImg -> ID Of targeted image
        targetedImgFound.src = imageSrc;
        //Ici on récupère la source de la video
        const videoSrc = event.target.currentSrc;
        //Ici on affiche la source de la video capturée
        const targetedVideoFound = document.getElementById('targetedVideo');
        // targetedVideo -> ID Of targeted video
        targetedVideoFound.src = videoSrc;
        //Apparition de la lightbox au clic
        const element = document.getElementById('bigImg');
        element.classList.remove('hidden');
        currentLightboxIndex = index;
        //apparition du titre de l'image
        document.getElementById('lightbox_name').innerText =
            arrayLightBoxes[currentLightboxIndex].parentElement.querySelector('h4').innerText;
    };

    myLightBoxes.forEach((figure, index) => {
        figure.addEventListener('click', (event) => {
            displayLightBox(event, index);
        });
    });

    //BOUTON FERMETURE LIGHTBOX
    const closeBtn = document.querySelector('.lightboxClose');
    closeBtn.addEventListener('click', () => {
        document.querySelector('.lightbox').classList.add('hidden');
    });
};

const triggerLightboxListeners = () => {
    //ICI VIENT LE BOUTON NEXT
    //La balise de class lightboxNext est la variable nextBtn
    const nextBtn = document.querySelector('.lightboxNext');
    //Lors du clic sur le bouton suivant, on recupere la source de l'image suivante.
    //Ici on a créé une fonction previous afin de pouvoir s'en resservir.
    const nextImg = () => {
        const myLightBoxes = document.querySelectorAll('figure > div');
        const arrayLightBoxes = Array.from(myLightBoxes);
        currentLightboxIndex += 1;
        //on affiche l'element +1 du tableau des elements lightbox
        if (arrayLightBoxes[currentLightboxIndex] === undefined) {
            //si l'element est indefini alors l'index courant vaut 0
            currentLightboxIndex = 0;
        }
        //si cet element a pour balise img ou video on recupere la source de cette image

        // SI IMAGE ->
        const imageElement = arrayLightBoxes[currentLightboxIndex].querySelector('img');

        // SI VIDEO ->
        const videoElement = arrayLightBoxes[currentLightboxIndex].querySelector('video');

        //On affiche
        console.log('getting image Element ->', { imageElement });
        if (imageElement) {
            //Retrait de la classe hidden sur les images
            document.getElementById('targetedImg').classList.remove('hidden');
            //Ajout de la classe hidden sur les videos
            document.getElementById('targetedVideo').classList.add('hidden');
            //La source de l'element image est la source qui se trouve dans targetedIMG dans le HTML
            document.getElementById('targetedImg').src = imageElement.src;
        } else {
            // Mode vidéo
            //Ce qui se trouve dans targetedVideo defini la variable targetedVideoElement
            const targetedVideoElement = document.getElementById('targetedVideo');
            //On retire la classe hidden de ce qui se trouve sur la vidéo parce quon a besoin que ca s'affiche
            targetedVideoElement.classList.remove('hidden');
            //On ajoute la classe hidden pour cacher les images
            document.getElementById('targetedImg').classList.add('hidden');
            //La source videoElement est la nouvelle source de la video
            const videoElementNewSource = videoElement.src;
            //On change l'attribut de la video capturée par la nouvelle source
            targetedVideoElement.setAttribute('src', videoElementNewSource);
        }

        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText =
            arrayLightBoxes[currentLightboxIndex].parentElement.querySelector('h4').innerText;
    };
    nextBtn.addEventListener('click', () => {
        nextImg();
    });

    //ICI VIENT LE BOUTON PREV
    const prevBtn = document.querySelector('.lightboxPrev');
    //Lors du clic sur le bouton precedent, on recupere la source de l'image precedente
    //Ici on a créé une fonction previous afin de pouvoir s'en resservir.
    const previousImg = () => {
        const myLightBoxes = document.querySelectorAll('figure > div');
        const arrayLightBoxes = Array.from(myLightBoxes);
        //si cet element+1 a pour balise img on recupere la source de cette image
        currentLightboxIndex -= 1;
        if (arrayLightBoxes[currentLightboxIndex] === undefined) {
            //Au debut de toutes les images, on retourne à la derniere
            //si l'element est indefini alors l'index courant vaut la taille du tableau de la ligthbox - 1
            currentLightboxIndex = arrayLightBoxes.length - 1;
        }
        const imageElement = arrayLightBoxes[currentLightboxIndex].querySelector('img');

        // SI VIDEO ->
        const videoElement = arrayLightBoxes[currentLightboxIndex].querySelector('video');

        //On affiche
        console.log('getting image Element ->', { imageElement });
        if (imageElement) {
            //Retrait de la classe hidden sur les images
            document.getElementById('targetedImg').classList.remove('hidden');
            //Ajout de la classe hidden sur les videos
            document.getElementById('targetedVideo').classList.add('hidden');
            //La source de l'element image est la source qui se trouve dans targetedIMG dans le HTML
            document.getElementById('targetedImg').src = imageElement.src;
        } else {
            // Mode vidéo
            //Ce qui se trouve dans targetedVideo defini la variable targetedVideoElement
            const targetedVideoElement = document.getElementById('targetedVideo');
            //On retire la classe hidden de ce qui se trouve sur la vidéo parce quon a besoin que ca s'affiche
            targetedVideoElement.classList.remove('hidden');
            //On ajoute la classe hidden pour cacher les images
            document.getElementById('targetedImg').classList.add('hidden');
            //La source videoElement est la nouvelle source de la video
            const videoElementNewSource = videoElement.src;
            //On change l'attribut de la video capturée par la nouvelle source
            targetedVideoElement.setAttribute('src', videoElementNewSource);
        }

        //affichage du titre de chaque image
        document.getElementById('lightbox_name').innerText =
            arrayLightBoxes[currentLightboxIndex].parentElement.querySelector('h4').innerText;
    };
    prevBtn.addEventListener('click', () => {
        previousImg();
    });

    //On ecoute les events au clavier pour la lightbox.
    //const img = document.querySelectorAll('figure > div');
    //console.log(img);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            //Si on appuie sur echap, on ferme la modale avec en param l'event.
            document.querySelector('.lightbox').classList.add('hidden');
        } else if (e.key === 'ArrowLeft') {
            previousImg();
        } else if (e.key === 'ArrowRight') {
            nextImg();
        }

        console.log(e.key);
    });
};

const initGalery = async () => {
    // Récupère les medias des photographes
    const { medias } = await getMedias();

    //On affiche les medias
    photographGaleryDisplay(medias);
    //On initialise la lightbox
    lightboxInit();
    triggerLightboxListeners();
};
initGalery();
