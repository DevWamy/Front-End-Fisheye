function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.href = `./photographer.html?id=${id}`;
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);
        img.setAttribute('tabindex', '');

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-hidden', true);

        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;
        h3.setAttribute('aria-hidden', true);

        const span = document.createElement('span');
        span.textContent = tagline;
        span.setAttribute('aria-hidden', true);

        const p = document.createElement('p');
        p.textContent = price + '€/jour';
        p.setAttribute('aria-hidden', true);

        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(span);
        article.appendChild(p);

        return a;
    }

    function getUserCardDOMPage() {
        const articlePage = document.createElement('article');

        const divProfil = document.createElement('div');

        const h1Page = document.createElement('h1');
        h1Page.textContent = name;

        const h2Page = document.createElement('h2');
        h2Page.textContent = city + ', ' + country;

        const h3Page = document.createElement('h3');
        h3Page.textContent = tagline;

        const globalPrice = document.createElement('h6');
        globalPrice.textContent = price;

        const imgPage = document.createElement('img');
        imgPage.setAttribute('src', picture);
        imgPage.setAttribute('alt', name);
        imgPage.setAttribute('tabindex', '0');
        articlePage.appendChild(divProfil);
        divProfil.appendChild(h1Page);
        divProfil.appendChild(h2Page);
        divProfil.appendChild(h3Page);
        divProfil.appendChild(globalPrice);
        articlePage.appendChild(imgPage);

        return articlePage;
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM, getUserCardDOMPage };
}
