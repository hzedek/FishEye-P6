
function photographerTemplate(data) {
    const { name, portrait, tagline, city,country, price,id} = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() { 
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        //Boutton cliquable sur l'image du photographe envoyant à son profil
        img.addEventListener('click', ()=>{
            document.location.href = 'http://127.0.0.1:5501/Front-End-Fisheye/photographer.html?'+id;
        })
        img.setAttribute("src", picture);
        img.classList.add("img");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("name")
        const p_tagline = document.createElement( 'p' );
        p_tagline.textContent = tagline;
        const p_city = document.createElement( 'p' );
        p_city.textContent = city+", "+country;
        p_city.classList.add("city")
        const p_price = document.createElement( 'p' );
        p_price.textContent = price+"/jour";
        p_price.classList.add("tagline");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_city);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        
        return (article);
    }
    
   async function photographerPageDisplay() {
        const nameId = document.getElementById("name");
        nameId.textContent = name;
        const cityId = document.getElementById("city");
        cityId.textContent = city+", "+country;
        const taglineId = document.getElementById("tagline");
        taglineId.textContent = tagline;
        img.setAttribute("src", picture);
        const media = data.newMedia;
        let sumlikes = 0
    //trier
        for (let i = 0; i < media.length; i++) {
            const imageObject = media[i];
            const article = document.getElementById('article');
            if (imageObject.image) {
                const imageRoute = `assets/images/${imageObject.image}`;
                const imageDisplay = `<div class="imageCard">
                <img class="image" id="${media[i].id}" src="${imageRoute}" alt="">
                <div class="title-likes">
                    <p class="city">${imageObject.title}</p>
                    <p class="city">${imageObject.likes}</p>
                    </div>
              </div>`
              article.innerHTML += imageDisplay;
              
            } if(imageObject.video) {
                const imageRoute = `assets/images/${imageObject.video}`;
                const imageDisplay = 
                `<div class="imageCard">
                <video class="image" id="${media[i].id}"  src="${imageRoute}" type="mp4"></video>
                <div class="title-likes">
                    <p class="city">${imageObject.title}</p>
                    <p class="city">${imageObject.likes}</p>
                </div>
              </div>`
                article.innerHTML += imageDisplay;
            }
           // lightbox
            let imgBtns = document.querySelectorAll(".image");
            
            imgBtns.forEach(imgBtn => {
                imgBtn.addEventListener('click', function lightbox() {
                    let lightbox_BG = document.querySelector(".lightbox-Bg");
                    let lightbox = document.getElementById("lightbox");
                    lightbox_BG.style.display = "block";
                    lightbox.style.display = "block";
                    if (imgBtn.attributes.type) {
                        let imgCarousel = document.createElement("video");
                        imgClicked = imgBtn.attributes.src.value
                    let carousel = document.getElementById("carousel");
                    imgCarousel.className="lightboxImg"
                    imgCarousel.setAttribute("src",imgClicked)
                    imgCarousel.setAttribute("id",imgBtn.id)
                    carousel.appendChild(imgCarousel)
                    }
                    else{
                        let imgCarousel = document.createElement("img");
                        imgClicked = imgBtn.attributes.src.value
                    let carousel = document.getElementById("carousel");
                    imgCarousel.className="lightboxImg"
                    imgCarousel.setAttribute("src",imgClicked)
                    imgCarousel.setAttribute("id",imgBtn.id)
                    carousel.appendChild(imgCarousel)
                    }
                })
            })

            //Somme des Likes et affiches de celui-ci dans la bannière
            sumlikes += parseInt(media[i].likes) ;
            const priceBanner = document.getElementById("priceBanner");
        const priceBannerDisplay = 
        `<div id="priceBanner">
            <p>${sumlikes} L</p>
            <p>${data.price}€ / jour</p>
        </div>`;
        priceBanner.innerHTML += priceBannerDisplay;
        }
        document.getElementById("close").addEventListener('click', function(){
            const lightbox_BG = document.querySelector(".lightbox-Bg");
            const lightbox = document.getElementById("lightbox");
            const closingLightbox = document.querySelector(".lightboxImg");
            lightbox_BG.style.display = "none";
            lightbox.style.display = "none";
            closingLightbox.remove();
            })
        function previousImg() {
            let currentImg = document.querySelector(".lightboxImg");
            let index = media.findIndex(  obj=> obj.id === parseInt(currentImg.id))
            if (index>0) {
                index -= 1
                if(media[index].video){
                    const imgCarousel = document.querySelector(".lightboxImg");
                    imgCarousel.remove();
                    let imgCarousel2 = document.createElement("video");
                    const imageRoute = `assets/images/${media[index].video}`;
                    imgCarousel2.setAttribute("id",media[index].id)
                    imgCarousel2.setAttribute("src",imageRoute)
                    imgCarousel2.className="lightboxImg"
                    carousel.appendChild(imgCarousel2)
                }
                else{
                    const imgCarousel = document.querySelector(".lightboxImg");
                    imgCarousel.remove();
                    let imgCarousel2 = document.createElement("img");
                    const imageRoute = `assets/images/${media[index].image}`;
                    imgCarousel2.setAttribute("id",media[index].id)
                    imgCarousel2.setAttribute("src",imageRoute)
                    imgCarousel2.className="lightboxImg"
                    carousel.appendChild(imgCarousel2)
            }}
        }
        document.getElementById("left").addEventListener("click",previousImg)
        function nextImg() {
            let currentImg = document.querySelector(".lightboxImg");
            let index = media.findIndex(obj=> obj.id === parseInt(currentImg.id))
            index += 1
            if (index<media.length) {
                if(media[index].video){
                    const imgCarousel = document.querySelector(".lightboxImg");
                    imgCarousel.remove();
                    let imgCarousel2 = document.createElement("video");
                    const imageRoute = `assets/images/${media[index].video}`;
                    imgCarousel2.setAttribute("id",media[index].id)
                    imgCarousel2.setAttribute("src",imageRoute)
                    imgCarousel2.className="lightboxImg"
                    carousel.appendChild(imgCarousel2)
                }
                else{

                    const imgCarousel = document.querySelector(".lightboxImg");
                    imgCarousel.remove();
                    let imgCarousel2 = document.createElement("img");
                    const imageRoute = `assets/images/${media[index].image}`;
                    imgCarousel2.setAttribute("id",media[index].id)
                    imgCarousel2.setAttribute("src",imageRoute)
                    imgCarousel2.className="lightboxImg"
                    carousel.appendChild(imgCarousel2)
            }}
        }
        document.getElementById("right").addEventListener("click",nextImg)
        /*Modal*/
        document.getElementById('modal-name').innerText += name 
    }
    
    return { name, picture, tagline, city,country, price,id, getUserCardDOM,photographerPageDisplay }
}

