'use strict';

const express = require( 'express' );
const app = express();
const path = require('path');

const ip = `http://localhost:8080/mediacites`

//app.use('/public', express.static('public'));

// Sample endpoint that sends the partner's name
app.get(`/categories`, function ( req, res ) {

    const filename = 'public/data/dummy.json'
    // Send it as a JSON object
    res.sendFile(filename);
} ); 

app.get(`/articles/:category_name/:keyword`, function (req, res) {
    const category_name = req.params.category_name;
    fetch(`${ip}/data/articles.json`)
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(article => article.id === category_name);
            if (article) {
                res.send(article[req.params.keyword]);
            } else {
                res.status(404).send({ error: 'Article not found' });
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
});


// Export our API
module.exports = app;