'use strict';

const app = require( 'express' )();
const path = require('path');

// Sample endpoint that sends the partner's name
app.get('/animals/*', function ( req, res ) {
    let POIs;
    console.log(req);
    // Get partner's topic from folder name
    let json = require(path.join(__dirname, '/../public/data/db.json'));
    let key = req.params[0];
    POIs = json['animals'][key];
    // Send it as a JSON object
    res.json(POIs);
} );

// Export our API
module.exports = app;
