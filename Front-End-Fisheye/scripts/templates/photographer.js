// Lien vers Accueil
document.querySelector(".logo").onclick = function () {
  location.href = "http://127.0.0.1:5501/Front-End-Fisheye/";
};
document.querySelector(".logo").addEventListener("keydown",function (event) {
if (event.key === "Enter") {
  location.href = "http://127.0.0.1:5501/Front-End-Fisheye/";
}
});

function photographerTemplate(data) {
  const { name, portrait, tagline, city, country, price, id } = data;
  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    //Boutton cliquable sur l'image du photographe envoyant à son profil
    const img = document.createElement("img"); // Utiliser une balise <button> pour l'élément cliquable
    img.addEventListener("click", () => {
      location.href =
        "http://127.0.0.1:5501/Front-End-Fisheye/photographer.html?" + id;
    });
    img.setAttribute("aria-label", `Voir le profil de ${name}`); // Ajouter une description ARIA
    img.setAttribute("role", "link"); // Ajouter un rôle ARIA
    img.setAttribute("src", picture);
    img.classList.add("img");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("name");
    const p_tagline = document.createElement("p");
    p_tagline.textContent = tagline;
    const p_city = document.createElement("p");
    p_city.textContent = city + ", " + country;
    p_city.classList.add("smallFontSize","indexLineHeight");
    const p_price = document.createElement("p");
    p_price.textContent = price + "/jour";
    p_price.classList.add("indexLineHeight","greyColor");
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p_city);
    article.appendChild(p_tagline);
    article.appendChild(p_price);

    return article;
  }

  async function photographerPageDisplay() {
    const nameId = document.getElementById("name");
    nameId.textContent = name;
    const cityId = document.getElementById("city");
    cityId.textContent = city + ", " + country;
    const taglineId = document.getElementById("tagline");
    taglineId.textContent = tagline;
    img.setAttribute("src", picture);
    const media = data.newMedia;
    let sumlikes = 0;
    for (let i = 0; i < media.length; i++) {
      const imageObject = media[i];
      const article = document.getElementById("article");
      if (imageObject.image) {
        const imageRoute = `assets/images/${imageObject.image}`;
        const imageDisplay = `<div class="imageCard">
                <button tabindex="0" class="buttonImg">
                <img class="image" id="${media[i].id}" title="${imageObject.title}" src="${imageRoute}" alt="${imageObject.title}">
                </button>
                <div class="title-likes">
                <p class="smallFontSize redWineColor">${imageObject.title}</p>
                <div class="alignLikes">
                    <p class="smallFontSize redWineColor likes">${imageObject.likes}</p>
                    <i role="button" tabindex="0" style="color:#901C1C" class="fa-regular fa-heart like"></i>
                    </div>
              </div>`;
        article.innerHTML += imageDisplay;
      }
      if (imageObject.video) {
        const imageRoute = `assets/images/${imageObject.video}`;
        const imageDisplay = `<div class="imageCard">
                <button  tabindex="0" class="buttonImg">
                <video class="image" title="${imageObject.title}" id="${media[i].id}"  src="${imageRoute}" type="mp4"></video>
                </button>
                <div class="title-likes">
                <p class="smallFontSize redWineColor">${imageObject.title}</p>
                <div class="alignLikes">
                    <p class="smallFontSize redWineColor likes">${imageObject.likes}</p>
                    <i role="button" tabindex="0" style="color:#901C1C" class="fa-regular fa-heart like"></i>
                    </div>
              </div>`;
        article.innerHTML += imageDisplay;
      }
      // lightbox
      let imgBtns = document.querySelectorAll(".buttonImg");

      imgBtns.forEach((imgBtn) => {
        const imgTitle = imgBtn.title;
        imgBtn.addEventListener("click", function lightbox() {
          const clickButton = imgBtn.querySelector(".image");
          let lightbox_BG = document.querySelector(".lightbox-Bg");
          let lightbox = document.getElementById("lightbox");     
          lightbox_BG.style.display = "block";
          lightbox.style.display = "block";
          let carousel = document.getElementById("carousel");
          let imgCarousel;
          if (clickButton.attributes.type) {
            imgCarousel = document.createElement("video");
            imgCarousel.setAttribute("controls", "controls"); // Ajouter des contrôles pour les vidéos
            imgCarousel.setAttribute("tabIndex", "2");

          } else {
            imgCarousel = document.createElement("img");
          }
          imgCarousel.className = "lightboxImg";
          imgCarousel.setAttribute("src", clickButton.attributes.src.value);
          imgCarousel.setAttribute("id", clickButton.id);
          carousel.appendChild(imgCarousel);
          let imgTitleElement = document.createElement("p");
          imgTitleElement.innerText = imgTitle;
          imgTitleElement.className = "smallFontSize redWineColor imgTitle";
          carousel.appendChild(imgTitleElement);
          document.getElementById("left").focus()
        });
      })

      //Somme des Likes et affiches de celui-ci dans la bannière
      sumlikes += parseInt(media[i].likes);
      const priceBanner = document.getElementById("priceBanner");
      const priceBannerDisplay = `<div id="priceBanner">
            <div class="align">
                <p>${sumlikes}</p>
                <img src="assets/icons/heart-solid.svg"/>
                </div>
            <p>${data.price}€ / jour</p>
        </div>`;
      priceBanner.innerHTML += priceBannerDisplay;
    }
    //Implémentation du like et remplissage de l'icone
    const likeIcon = document.querySelectorAll(".fa-regular.fa-heart.like");

likeIcon.forEach((icon) => {
  icon.setAttribute("role", "button");
  icon.setAttribute("tabindex", "0");

  async function likeOrNot(e) {
    const parentContainer = e.target.closest(".alignLikes");

    // Si l'élément parent a été trouvé, continuez
    if (parentContainer) {
      // Accédez à l'élément "likes" à l'intérieur de l'élément parent
      const numberLikes = parentContainer.querySelector(".likes");

      // si icon coeur est regular (vide) alors +1
      if (e.target.classList.contains("fa-regular")) {
        numberLikes.innerHTML = parseInt(numberLikes.innerHTML) + 1;
      } else {
        numberLikes.innerHTML = parseInt(numberLikes.innerHTML) - 1;
      }

      // Basculez les classes de l'icône
      e.target.classList.toggle("fa-regular");
      e.target.classList.toggle("fa-solid");
    }
  }
  icon.addEventListener("keydown",(e)=>{
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      const parentContainer = e.target.closest(".alignLikes");

      // Si l'élément parent a été trouvé, continuez
      if (parentContainer) {
        // Accédez à l'élément "likes" à l'intérieur de l'élément parent
        const numberLikes = parentContainer.querySelector(".likes");

        // si icon coeur est regular (vide) alors +1
        if (e.target.classList.contains("fa-regular")) {
          numberLikes.innerHTML = parseInt(numberLikes.innerHTML) + 1;
        } else {
          numberLikes.innerHTML = parseInt(numberLikes.innerHTML) - 1;
        }

        // Basculez les classes de l'icône
        e.target.classList.toggle("fa-regular");
        e.target.classList.toggle("fa-solid");
      }}
  })

  icon.addEventListener("click", likeOrNot);
});
    function closeLightbox() {
      const lightbox_BG = document.querySelector(".lightbox-Bg");
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.querySelector(".lightboxImg");
      lightbox_BG.style.display = "none";
      lightbox.style.display = "none";
      lightboxImg.remove();
      const imgTitle = document.querySelector(".imgTitle");
      imgTitle.remove();
    }
    document.getElementById("close").addEventListener("click", function () {
      closeLightbox()
    });
    document.getElementById("close").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        closeLightbox();
      }});
    function previousImg() {
      let currentImg = document.querySelector(".lightboxImg");
      let index = media.findIndex((obj) => obj.id === parseInt(currentImg.id));
      if (index > 0) {
        index -= 1;
        const imgTitle = document.querySelector(".imgTitle");
        imgTitle.innerText = media[index].title;
        if (media[index].video) {
          const imgCarousel = document.querySelector(".lightboxImg");
          imgCarousel.remove();
          let imgCarousel2 = document.createElement("video");
          const imageRoute = `assets/images/${media[index].video}`;
          imgCarousel2.setAttribute("id", media[index].id);
          imgCarousel2.setAttribute("src", imageRoute);
          imgCarousel2.setAttribute("controls", "controls");
          imgCarousel2.setAttribute("tabIndex", "2");
          imgCarousel2.className = "lightboxImg";
          carousel.appendChild(imgCarousel2);
        } else {
          const imgCarousel = document.querySelector(".lightboxImg");
          imgCarousel.remove();
          let imgCarousel2 = document.createElement("img");
          const imageRoute = `assets/images/${media[index].image}`;
          imgCarousel2.setAttribute("id", media[index].id);
          imgCarousel2.setAttribute("src", imageRoute);
          imgCarousel2.className = "lightboxImg";
          carousel.appendChild(imgCarousel2);
        }
        carousel.appendChild(imgTitle);
      }
    }
    document.getElementById("left").addEventListener("click", previousImg);
    function nextImg() {
      let currentImg = document.querySelector(".lightboxImg");
      let index = media.findIndex((obj) => obj.id === parseInt(currentImg.id));
      index += 1;
      if (index < media.length) {
        const imgTitle = document.querySelector(".imgTitle");
        imgTitle.innerText = media[index].title;
        if (media[index].video) {
          const imgCarousel = document.querySelector(".lightboxImg");
          imgCarousel.remove();
          let imgCarousel2 = document.createElement("video");
          const imageRoute = `assets/images/${media[index].video}`;
          imgCarousel2.setAttribute("id", media[index].id);
          imgCarousel2.setAttribute("src", imageRoute);
          imgCarousel2.setAttribute("controls", "controls");
          imgCarousel2.setAttribute("tabIndex", "2");
          imgCarousel2.className = "lightboxImg";
          carousel.appendChild(imgCarousel2);
        } else {
          const imgCarousel = document.querySelector(".lightboxImg");
          imgCarousel.remove();
          let imgCarousel2 = document.createElement("img");
          const imageRoute = `assets/images/${media[index].image}`;
          imgCarousel2.setAttribute("id", media[index].id);
          imgCarousel2.setAttribute("src", imageRoute);
          imgCarousel2.className = "lightboxImg";
          carousel.appendChild(imgCarousel2);
        }
        carousel.appendChild(imgTitle);
      }
    }
    document.getElementById("right").addEventListener("click", nextImg);
    document.getElementById("left").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        previousImg();
      }
    });
    
    document.getElementById("right").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        nextImg();
      }
    });
    /*Nom du photograph dans le Modal*/
    document.getElementById("modal-name").innerText = name;
  }

  return {
    name,
    picture,
    tagline,
    city,
    country,
    price,
    id,
    getUserCardDOM,
    photographerPageDisplay,
  };
}
