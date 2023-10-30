//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer() {
    //Je récupere L'id de l'URL
    let parsedUrl = window.location.search;
    //j'enlève le "?" pour récuperer seulement l'ID
    const _id = parsedUrl.slice(1);
    const reponse = await fetch("./data/photographers.json");
    const promise = await reponse.json();
    const photographers = promise.photographers;
    const medias = promise.media;
    const newMedia = [];
    //récupération des données du photographe
    const photographer = photographers.find((user) => user.id === parseInt(_id));
    console.log(photographer);

    medias.forEach(media => {
        let mediaphotographer = media.photographerId === parseInt(_id);
        if (mediaphotographer) {
            newMedia.push(media)
        }
    });
    function createElement(name,id,city,country,tagline,price,portrait,newMedia) {
        return{
            name,id,city,country,tagline,price,portrait,
            newMedia
        }
    }
    const newPhotographer = createElement(photographer.name,photographer.id,photographer.city,photographer.country,photographer.tagline,photographer.price,photographer.portrait,newMedia)
    return ({newPhotographer})
}

async function displayData(newPhotographer) {
    const photographerModel = photographerTemplate(newPhotographer);
    photographerModel.photographerPageDisplay();
    };


async function init() {
    // display le photographe
    const { newPhotographer} = await getPhotographer();
    displayData(newPhotographer);
}

init();
