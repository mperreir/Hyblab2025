'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create a router instance
const router = express.Router();

// Path to the JSON file
const articlesPath = path.join(__dirname, '../public/data/articles.json');

router.get('/articles', (req, res) => {
    fs.readFile(articlesPath, 'utf8', (err, data) => {
        console.log('Looking for JSON at:', articlesPath);
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

router.get('/articles/:category_name', (req, res) => {
    console.log(`Fetching full article data for category: ${req.params.category_name}`);

    fs.readFile(articlesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON:', err);
            return res.status(500).send({ error: 'Failed to load articles data.' });
        }

        try {
            const articles = JSON.parse(data);
            const article = articles.find(article => article.id === req.params.category_name);

            if (!article) {
                console.log(`Article "${req.params.category_name}" not found`);
                return res.status(404).send({ error: 'Article not found.' });
            }

            res.json(article);

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send({ error: 'Failed to parse articles data.' });
        }
    });
});

router.get('/links/:category_name', (req, res) => {
    console.log(`Fetching links for category: ${req.params.category_name}`);

    fs.readFile(articlesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON:', err);
            return res.status(500).send({ error: 'Failed to load links data.' });
        }

        try {
            const articles = JSON.parse(data);
            const article = articles.find(article => article.id === req.params.category_name);

            if (!article || !article.links) {
                console.log(`No links found for category "${req.params.category_name}"`);
                return res.status(404).send({ error: 'No links found for this category.' });
            }

            res.json(article.links);

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send({ error: 'Failed to parse links data.' });
        }
    });
});

// Export the API
module.exports = router;