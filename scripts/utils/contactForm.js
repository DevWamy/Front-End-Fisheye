// Eléments du DOM
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');

// fermeture de la modale
function closeModal() {
    document.getElementById('bgroundClose').style.display = 'none';
    document.querySelector('main').style.display = 'block';
}

// Chargement de l'évènement modal
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Chargement du formulaire modal
function launchModal() {
    const form = document.querySelector('form');
    form.reset();
    document.getElementById('modalClose').style.display = 'block';
    modalbg.style.display = 'block';
    //document.querySelector('.bground').classList.remove('d-none');
    //On fait disparaître la scrollbar de la page principale.
    document.querySelector('main').style.display = 'none';
}

// Déclaration expressions régulières à des fins de vérifications de champs
const regexName = /^[a-zA-ZàâäèéêëîïôöùûüÿçæœÀÂÄÉÈÊËÎÏÔÖÙÛÜÇÆŒ'\-]{2,}$/;
const regexMail = /^[a-zA-Z0-9.\-_]+@[a-z0-9.\-_]{2,}\.[a-z]{2,4}$/;

//Validation des formats en input

// Vérification des noms et prénoms
const validateIdentity = (inputName, errorField, errorMessage) => {
    document.getElementById(inputName).addEventListener('input', function () {
        if (regexName.test(this.value) === false) {
            this.style.color = 'red';
            document.getElementById(errorField).style.display = 'block';
            document.getElementById(errorField).innerHTML = errorMessage;
        } else if (regexName.test(this.value) === true) {
            document.getElementById(errorField).style.display = 'none';
            this.style.border = 'unset';
            this.style.color = 'green';
        } else {
            document.getElementById(errorField).style.display = 'none';
        }
    });
};

validateIdentity(
    'first',
    'errorName',
    'Veuillez entrer 2 caractères minimum, sans chiffres, ni caractères spéciaux pour le champ  prénom !',
);
validateIdentity(
    'last',
    'errorLastName',
    'Veuillez entrer 2 caractères minimum, sans chiffres, ni caractères spéciaux pour le champ  nom !',
);

let emailOk;
//Vérification de l'email
document.getElementById('email').addEventListener('input', function () {
    if (regexMail.test(this.value) === false) {
        this.style.color = 'red';
        document.getElementById('errorMail').style.display = 'block';
        document.getElementById('errorMail').innerHTML = 'Veuillez entrer une adresse mail valide !';
    } else if (regexMail.test(this.value) === true) {
        document.getElementById('errorMail').style.display = 'none';
        this.style.border = 'unset';
        this.style.color = 'green';
    } else {
        document.getElementById('errorMail').style.display = 'none';
    }

    emailOk = document.getElementById('email').value;
});

let form = document.querySelector('.form');
form.addEventListener('click', function (e) {
    e.preventDefault();
});

function validateModal() {
    let formNom = document.querySelector('#last').value;
    let formPrenom = document.querySelector('#first').value;
    let formEmail = document.querySelector('#email').value;
    let formMessage = document.querySelector('#message').value;

    // Je récupere la valeur du champ et l'affiche en console
    if (
        formNom.length > 0 &&
        formPrenom.length > 0 &&
        formEmail.length > 0 &&
        formMessage.length > 0 &&
        formMessage.length != '    '
    ) {
        console.log('Nom : ' + formNom);
        console.log('Prénom : ' + formPrenom);
        console.log('Email : ' + formEmail);
        console.log('Message: ' + formMessage);

        closeModal();
    } else if (
        formNom.length < 1 ||
        formPrenom.length < 1 ||
        formEmail.length < 1 ||
        formMessage.length < 1 ||
        formMessage.length != ''
    ) {
        document.getElementById('error').innerHTML = 'Veuillez renseigner tous les champs';
        document.querySelector('.text-control').style.border = '3.2px solid red';
    } else {
        closeModal();
    }
}
