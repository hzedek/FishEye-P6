//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer() {
    //Je récupere L'id de l'URL
    let parsedUrl = window.location.search;
    //j'enlève le "?" pour récuperer seulement l'ID
    const _id = parsedUrl.slice(1);
    const reponse = await fetch("./data/photographers.json");
    const promise = await reponse.json();
    const photographers = promise.photographers
    //récupération des données du photographe
    const photographer = photographers.find((user) => user.id === parseInt(_id));
    return ({photographer})
}

async function displayData(photographer) {
    const photographerheader = document.querySelector("photograph-header");
   
        const photographerModel = photographerTemplate(photographer);
        const photographerPageDisplay = photographerModel.photographerPageDisplay();
        photographerheader.appendChild(photographerPageDisplay);
        
    };


async function init() {
    // display le photographe
    const { photographer} = await getPhotographer();
    displayData(photographer);
}

init();
