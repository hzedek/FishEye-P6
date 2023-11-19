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
  medias.forEach((media) => {
    let mediaphotographer = media.photographerId === parseInt(_id);
    if (mediaphotographer) {
      newMedia.push(media);
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
    newMedia: newMedia,
  };

  return { newPhotographer };
}

async function displayData(newPhotographer) {
  const photographerModel = photographerTemplate(newPhotographer);
  photographerModel.photographerPageDisplay();
}

async function init() {
  // display le photographe
  const { newPhotographer } = await getPhotographer();
  displayData(newPhotographer);
}
init();

// Écouteur d'événement pour le tri par popularité
async function sortByPopularity() {
  const { newPhotographer } = await getPhotographer();
  const media = newPhotographer.newMedia;
  // Tri des médias par likes
  media.sort((a, b) => a.likes - b.likes);
  const articlesup = document.querySelector("article");
  articlesup.innerHTML = "";
  // Affichage des données triées
  displayData(newPhotographer);
}

document.getElementById("popularite_sort").addEventListener("click", async () => {
  sortByPopularity();
});
document.getElementById("popularite_sort").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sortByPopularity();
  }
});

// Écouteur d'événement pour le tri par date
async function sortByDate() {
  const { newPhotographer } = await getPhotographer();
  const media = newPhotographer.newMedia;
  media.forEach((media) => {
    media.dateObj = new Date(media.date);
  });
  media.sort((a, b) => a.dateObj - b.dateObj);
  const articlesup = document.querySelector("article");
  articlesup.innerHTML = "";
  displayData(newPhotographer);
}

document.getElementById("date_sort").addEventListener("click", async () => {
  sortByDate();
});
document.getElementById("date_sort").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sortByDate();
  }
});
// Écouteur d'événement pour le tri par titre
async function sortByTitle() {
  const { newPhotographer } = await getPhotographer();
  const media = newPhotographer.newMedia;
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
  });
  const articlesup = document.querySelector("article");
  articlesup.innerHTML = "";
  // Affichage des données triées
  displayData(newPhotographer);
}

document.getElementById("titre_sort").addEventListener("click", async () => {
sortByTitle()
});
document.getElementById("titre_sort").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sortByTitle();
  }
});

//Fonction qui montre ou non le menu déroulant
const trierGrid = document.querySelector('.trier-grid');
const MenuDeroulant = document.querySelector('.MenuDeroulant');
const selectedOption = document.getElementById('selectedOption');
const buttonOption = document.getElementById('buttonOption');
const liItems = document.querySelectorAll('.MenuDeroulant p');
const menuOptions = document.getElementById('menuOptions')

buttonOption.addEventListener('keydown', () => {
  MenuDeroulant.style.display = "block";
      // Mettre le focus sur le premier élément du menu lorsque celui-ci s'ouvre
      document.getElementById('popularite_sort').focus();
  toggleMenu();
});

buttonOption.addEventListener('click', () => {
  MenuDeroulant.style.display = "block";
});

// JavaScript pour gérer la sélection d'un élément de la liste
liItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        selectedOption.textContent = item.textContent;
        MenuDeroulant.style.display = 'none';
        })
   item.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowDown') {
            // Naviguer vers le bas
            liItems[(index + 1) % liItems.length].focus();
          } else if (event.key === 'ArrowUp') {
            // Naviguer vers le haut
            liItems[(index - 1 + liItems.length) % liItems.length].focus();
          }
          if(event.key === 'Enter'){
          selectedOption.textContent = item.textContent;
          MenuDeroulant.style.display = 'none';
          closeMenu()
          }
        });    
    });

function toggleMenu() {
  const expanded = buttonOption.getAttribute('aria-expanded') === 'true';
  buttonOption.setAttribute('aria-expanded', !expanded);
  menuOptions.setAttribute('aria-hidden', expanded);
  if (!expanded) {
  }
}
function closeMenu() {
  buttonOption.setAttribute('aria-expanded', 'false');
  menuOptions.setAttribute('aria-hidden', 'true');
  buttonOption.focus();
}