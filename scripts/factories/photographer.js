function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.href = `./photographer.html?id=${id}`
        const article = document.createElement( 'article' );


        const img = document.createElement( 'img' );
        img.setAttribute('src', picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ', ' + country;

        const span = document.createElement('span');
        span.textContent = tagline;

        const p = document.createElement('p');
        p.textContent = price + "€/jour";
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(span);
        article.appendChild(p);

        return (a);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}