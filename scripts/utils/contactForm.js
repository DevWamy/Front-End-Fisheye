/*function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}*/

// Eléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Chargement de l'évènement modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Chargement du formulaire modal
function launchModal() {
    document.getElementById('formCloseContent').style.display = 'none';
    document.getElementById('modalClose').style.display = 'block';
    modalbg.style.display = "block";
}

// Déclaration expressions régulières à des fins de vérifications de champs
const regexName = /^[a-zA-ZàâäèéêëîïôöùûüÿçæœÀÂÄÉÈÊËÎÏÔÖÙÛÜÇÆŒ'\-]{2,}$/;
const regexMail = /^[a-zA-Z0-9.\-_]+@[a-z0-9.\-_]{2,}\.[a-z]{2,4}$/;


//Validation des formats en input

// Vérification des noms et prénoms
const validateIdentity =  (inputName, errorField, errorMessage) => {
    document.getElementById(inputName).addEventListener("input", function(){
        if (regexName.test(this.value) === false) {
            this.style.color = 'red';
            document.getElementById(errorField).style.display = 'block';
            document.getElementById(errorField).innerHTML = errorMessage;

        }
        else if (regexName.test(this.value) === true) {
            document.getElementById(errorField).style.display = 'none';
            this.style.border = 'unset';
            this.style.color = 'green';

        }
        else{
            document.getElementById(errorField).style.display = 'none';

        }

        });
}
validateIdentity("first", "errorName", "Veuillez entrer 2 caractères minimum, sans chiffres, ni caractères spéciaux pour le champ du prénom !");
validateIdentity("last", "errorLastName", "Veuillez entrer 2 caractères minimum, sans chiffres, ni caractères spéciaux pour le champ du nom !")

//Vérification de l'email
document.getElementById("email").addEventListener("input", function(){
    if (regexMail.test(this.value) === false) {
        this.style.color = 'red';
        document.getElementById('errorMail').style.display = 'block';
        document.getElementById('errorMail').innerHTML = 'Veuillez entrer une adresse mail valide !';

    }
    else if (regexMail.test(this.value) === true) {
        document.getElementById('errorMail').style.display = 'none';
        this.style.border = 'unset';
        this.style.color = 'green';

    }
    else{
        document.getElementById('errorMail').style.display = 'none';
    }

    });

  //Validation des champs soumis
document.forms["reserve"].addEventListener("submit", function(event) {

    let error;
    let valid = true;
    
    for (let i = 0;  i < this.length; i++){
        if(!this[i].value){
            error = 'Veuillez renseigner tous les champs';
            this[i].style.border = '3.2px solid red';
            valid = false;
            break;
        }
    }
    
    if (!valid) {
        event.preventDefault();
        document.getElementById('error').innerHTML = error;
        return false;
    }
    else {
        event.preventDefault();
        document.getElementById('modalClose').style.display = 'none';
        document.getElementById('formClose').style.display = 'none';
        document.getElementById('formCloseContent').style.display = 'flex';  
    }
});

  //Contournement afin d'éviter l'utilisation de span
    const crossClose = document.getElementById('formClose');
    const formulaireClose = document.getElementById('bgroundClose');

    crossClose.addEventListener("click", function() {
        if(formulaireClose.style.display != "none"){
            formulaireClose.style.display = "none";
    }
});

    document.getElementById('closeForm').addEventListener("click", function() {
        document.forms["reserve"].submit();
    });

    document.getElementById('closingMessage').addEventListener("click", function() {
        document.forms["reserve"].submit();
    });