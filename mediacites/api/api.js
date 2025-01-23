'use strict';

const app = require( 'express' )();
const path = require('path');

const ip = `localhost:8080/mediacites`

// Sample endpoint that sends the partner's name
app.get(`/api/categories`, function ( req, res ) {

    const filename = 'public/data/dummy.json'
    // Send it as a JSON object
    res.sendFile(filename);
} );

app.get(`http://${ip}/api/articles/:category_name`, function ( req, res ) {
    const category_name = req.params.category_name;

    // Send it as a JSON object
    res.send({category_name});
} );

app.get(`http://${ip}/api/articles/:category_name/kpis`, function ( req, res ) {
    const category_name = req.params.articles.category_name;

    // Send it as a JSON object
    res.send({});
} );

app.get(`http://${ip}/api/articles/:category_name/linked_categories`, function ( req, res ) {
    const category_name = req.params.articles.category_name;

    // Send it as a JSON object
    res.send({});
} );

app.get(`http://${ip}/api/articles/:category_name/links`, function ( req, res ) {
    const category_name = req.params.articles.category_name;

    // Send it as a JSON object
    res.send({});
} );

// Export our API
module.exports = app;