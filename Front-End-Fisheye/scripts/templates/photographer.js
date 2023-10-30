
function photographerTemplate(data) {
    console.log(data.newMedia);
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
    
    function photographerPageDisplay() {
        const nameId = document.getElementById("name");
        nameId.textContent = name;
        const cityId = document.getElementById("city");
        cityId.textContent = city+", "+country;
        const taglineId = document.getElementById("tagline");
        taglineId.textContent = tagline;
        img.setAttribute("src", picture);


        /*const article = document.createElement( 'article' );
        for (let i = 0; i < media.length; i++) {
            const image = media[i];
            const imagePhotographer = `assets/images/${portrait}`;
        }*/
        
    }
    
    return { name, picture, tagline, city,country, price,id, getUserCardDOM,photographerPageDisplay }
}