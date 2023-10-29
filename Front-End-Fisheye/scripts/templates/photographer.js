
function photographerTemplate(data) {
    const { name, portrait, tagline, city, price,id } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() { 
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        //Boutton cliquable sur l'image du photographe envoyant à son profil
        img.addEventListener('click', ()=>{
            document.location.href = 'http://127.0.0.1:5501/Front-End-Fisheye/photographer.html?'+id;
        }) 
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p_tagline = document.createElement( 'p' );
        p_tagline.textContent = tagline;
        const p_city = document.createElement( 'p' );
        p_city.textContent = city;
        const p_price = document.createElement( 'p' );
        p_price.textContent = price+"/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_city);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }
    function photographerPageDisplay() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        //Boutton cliquable sur l'image du photographe envoyant à son profil
        img.addEventListener('click', ()=>{
            document.location.href = 'http://127.0.0.1:5501/Front-End-Fisheye/photographer.html?'+id;
        }) 
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p_tagline = document.createElement( 'p' );
        p_tagline.textContent = tagline;
        const p_city = document.createElement( 'p' );
        p_city.textContent = city;
        const p_price = document.createElement( 'p' );
        p_price.textContent = price+"/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_city);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }
    
    return { name, picture, tagline, city, price,id, getUserCardDOM,photographerPageDisplay }
}