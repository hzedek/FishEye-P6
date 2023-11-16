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
    medias.forEach(media => {
        let mediaphotographer = media.photographerId === parseInt(_id);
        if (mediaphotographer) {
            newMedia.push(media)
        }
    });

    const newPhotographer = {
        name: photographer.name,
        id: photographer.id,
        city: photographer.city,
        country: photographer.country,
        tagline: photographer.tagline,
        price: photographer.price,
        portrait: photographer.portrait,
        newMedia: newMedia
    };
    
    return {newPhotographer};
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

// Écouteur d'événement pour le tri par popularité
document.getElementById('popularite_sort').addEventListener('click', async () => {
    const {newPhotographer} = await getPhotographer();
    const media = newPhotographer.newMedia
    // Tri des médias par likes
    media.sort((a, b) => a.likes - b.likes);
    const articlesup = document.querySelector("article")
    articlesup.innerHTML = "";
    // Affichage des données triées
    displayData(newPhotographer)
});

// Écouteur d'événement pour le tri par date
document.getElementById('date_sort').addEventListener('click', async () => {
    const {newPhotographer} = await getPhotographer();
    const media = newPhotographer.newMedia
    media.forEach(media => {
        media.dateObj = new Date(media.date); 
    });
    media.sort((a, b) => a.dateObj - b.dateObj);
    const articlesup = document.querySelector("article")
    articlesup.innerHTML = "";
    displayData(newPhotographer)
});

// Écouteur d'événement pour le tri par titre
document.getElementById('titre_sort').addEventListener('click', async () => {
    const {newPhotographer} = await getPhotographer();
    const media = newPhotographer.newMedia
    console.log(media);
    // Tri des médias par likes
    media.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
    
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });;
    const articlesup = document.querySelector("article")
    articlesup.innerHTML = "";
    // Affichage des données triées
    displayData(newPhotographer)
});
