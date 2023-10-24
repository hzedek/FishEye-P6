
function photographerTemplate(data) {
    const { name, portrait, tagline, city, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p_tagline = document.createElement( 'p' );
        p_tagline.textContent = tagline;
        const p_city = document.createElement( 'p' );
        p_city.textContent = city;
        const p_price = document.createElement( 'p' );
        p_price.textContent = price;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_price);
        article.appendChild(p_tagline);
        article.appendChild(p_city);
        return (article);
    }
    return { name, picture, tagline, city, price, getUserCardDOM }
}