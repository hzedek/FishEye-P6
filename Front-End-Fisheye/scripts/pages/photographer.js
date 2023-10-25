//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(event) {
    const id = event.target.dataset.id;
    fetch(`http://localhost:5501/photographer.html/${id}/`);
    console.log(id);
    return ({
        
        photographers: [photographers.photographers]}                                                                                                                             )
}

async function displayData(photographers) {
    const photographerSection = document.querySelector(".photographer_section");

}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographer();
    displayData(photographers);
}


init();