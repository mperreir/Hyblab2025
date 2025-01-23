'use strict';

const express = require( 'express' );
const app = express();
const path = require('path');

const ip = `localhost:8080/mediacites`

//app.use('/public', express.static('public'));

// Sample endpoint that sends the partner's name
app.get(`/categories`, function ( req, res ) {

    const filename = 'public/data/dummy.json'
    // Send it as a JSON object
    res.sendFile(filename);
} );

function fetchArticlesData(category_name, dataKey, res) {
    fetch(`http://${ip}/data/articles.json`)
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(article => article.id === category_name);
            if (article) {
                res.send(article[dataKey]);
            } else {
                res.status(404).send({ error: 'Article not found' });
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

app.get(`/articles/:category_name`, function (req, res) {
    const category_name = req.params.category_name;
    fetchArticlesData(category_name, 'text', res);
});

app.get(`/articles/:category_name/kpis`, function (req, res) {
    const category_name = req.params.category_name;
    fetchArticlesData(category_name, 'kpis', res);
});

app.get(`/articles/:category_name/linked_categories`, function (req, res) {
    const category_name = req.params.category_name;
    fetchArticlesData(category_name, 'linked_categories', res);
});

app.get(`/articles/:category_name/links`, function (req, res) {
    const category_name = req.params.category_name;
    fetchArticlesData(category_name, 'links', res);
});

// Export our API
module.exports = app;