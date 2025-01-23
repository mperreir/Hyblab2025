'use strict';

const express = require( 'express' );
const app = express();
const path = require('path');

const ip = `http://localhost:8080/mediacites`

app.get(`/articles/:category_name/:keyword`, function (req, res) {
    // Récuperer le nom, le texte, les kpis, les catégories liées ou bien les liens vers les délégations d'un article
    const category_name = req.params.category_name;
    fetch(`${ip}/data/articles.json`)
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(article => article.id === category_name);
            if (article) {
                res.json(article[req.params.keyword]);
            } else {
                res.status(404).send({ error: 'Article not found' });
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

app.get(`/bidule/:page_name`, function (req, res) {
    // Récupérer le texte de Bidule (la mascotte)
    const page_name = req.params.page_name;
    fetch(`${ip}/data/bidule.json`)
        .then(response => response.json())
        .then(bidules => {
            const bidule = bidules.find(bidule => bidule.page_name === page_name);
            if (bidule) {
                res.json(bidule.text);
            } else {
                res.status(404).send({ error: 'Article not found' });
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
})


// Export our API
module.exports = app;