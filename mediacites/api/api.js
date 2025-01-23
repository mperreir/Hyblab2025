'use strict';

const express = require( 'express' );
const app = express();
const path = require('path');

const ip = `http://ocalhost:8080/mediacites`

app.get(`/categories`, function ( req, res ) {

    fetch(`${ip}/data/articles.json`)
    .then(response => response.json())
    .then(articles => {
        const categories = articles.map(articles => articles.id)
        if (categories) {
            res.send(categories);
        } else {
            res.status(404).send({ error: 'Article not found' });
        }
    })
    .catch(error => { console.error('Error fetching JSON:', error)});
} );

app.get(`/articles/:category_name`, function ( req, res ) {
    const category_name = req.params.category_name;

    fetch(`${ip}/data/articles.json`)
    .then(response => response.json())
    .then(articles => {
        const article = articles.find(article => article.id === category_name);
        if (article) {
            res.send(article.text);
        } else {
            res.status(404).send({ error: 'Article not found' });
        }
    })
    .catch(error => { console.error('Error fetching JSON:', error)});
} );

app.get(`/articles/:category_name/kpis`, function ( req, res ) {
    const category_name = req.params.category_name;

    fetch('http://localhost:3000/public/articles.json')
    .then(response => response.json())
    .then(articles => {
        const article = articles.find(article => article.id === category_name);
        if (article) {
            res.send(article.kpis);
        } else {
            res.status(404).send({ error: 'Article not found' });
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
} );

app.get(`/articles/:category_name/linked_categories`, function ( req, res ) {
    const category_name = req.params.category_name;

    fetch('http://localhost:3000/public/articles.json')
    .then(response => response.json())
    .then(articles => {
        const article = articles.find(article => article.id === category_name);
        if (article) {
            res.send(article.linked_categories);
        } else {
            res.status(404).send({ error: 'Article not found' });
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
} );

app.get(`/articles/:category_name/links`, function ( req, res ) {
    const category_name = req.params.category_name;

    fetch('http://localhost:3000/public/articles.json')
    .then(response => response.json())
    .then(articles => {
        const article = articles.find(article => article.id === category_name);
        if (article) {
            res.send(article.links);
        } else {
            res.status(404).send({ error: 'Article not found' });
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
} );

// Export our API
module.exports = app;