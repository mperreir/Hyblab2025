'use strict';

const express = require('express');
const app = express();
const path = require('path');

const ip = `http://localhost:8080/mediacites`

app.get(`/articles/:category_name/:keyword`, function (req, res) {
    // Récuperer le nom, le texte, les kpis, les catégories liées ou bien les liens vers les délégations d'un article
    const { category_name, keyword } = req.params;

    const article = articles.find(article => article.id === category_name);

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

// Export our API
module.exports = app;




/*

app.get('/articles/:category_name/:keyword', async (req, res) => {
    console.log('Received request:', req.params);  // Log the category and keyword
    try {
        const { category_name, keyword } = req.params;
        const response = await fetch(`${ip}/data/articles.json`);
        const articles = await response.json();

        const article = articles.find(article => article.id === category_name);

        if (!article) {
            console.log('Article not found');
            return res.status(404).json({ error: 'Article not found' });
        }

        if (!(keyword in article)) {
            console.log(`Keyword "${keyword}" not found`);
            return res.status(404).json({ error: `Keyword "${keyword}" not found` });
        }

        res.json(article[keyword]);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

*/