'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Create a router instance
const router = express.Router();

// Path to the JSON file
const articlesPath = path.join(__dirname, '../public/data/articles.json');

router.use(cors());

router.get('/articles', (req, res) => {
    // Get all articles
    fs.readFile(articlesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send({ error: 'Failed to load articles data.' });
        }
        try {
            const articles = JSON.parse(data);
            res.send(articles);
        } catch (parseError) {
            console.error('Error parsing JSON file:', parseError);
            res.status(500).send({ error: 'Failed to parse articles data.' });
        }
    });
});

// Route to fetch article data based on category_name and keyword
router.get('/articles/:category_name/:keyword', (req, res) => {
    const { category_name, keyword } = req.params;

    // Read the JSON file
    fs.readFile(articlesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).send({ error: 'Failed to load articles data.' });
        }

        try {
            const articles = JSON.parse(data);
            const article = articles.find(article => article.id === category_name);

            if (!article) {
                return res.status(404).send({ error: 'Article not found.' });
            }

            if (!article[keyword]) {
                return res.status(404).send({ error: `Keyword "${keyword}" not found in article.` });
            }

            res.json(article[keyword]);
        } catch (parseError) {
            console.error('Error parsing JSON file:', parseError);
            res.status(500).send({ error: 'Failed to parse articles data.' });
        }
    });
});

// Export the API
module.exports = router;

/*

app.get(`/mediacites/articles/:category_name/:keyword`, function (req, res) {
    // Récuperer le nom, le texte, les kpis, les catégories liées ou bien les liens vers les délégations d'un article
    const { category_name, keyword } = req.params;

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


*/