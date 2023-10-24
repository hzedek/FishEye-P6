//import { photographers } from ".data/photographers.json"; 

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

    // Récupération des data des photographe depuis le fichier JSON
    const reponse = await fetch("./data/photographers.json");
    const photographers = await reponse.json();        
    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        
        photographers: [photographers.photographers]}                                                                                                                             )
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        //Boucle for pour afficher tout les photographes
        for (let i = 0; i < photographer.length; i++) {
        const photographerModel = photographerTemplate(photographer[i]);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
       }
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}


init();

    
