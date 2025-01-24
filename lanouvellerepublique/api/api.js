'use strict';

const app = require( 'express' )();
const path = require('path');

// Sample endpoint that sends the partner's name
app.get('/animals/*', function ( req, res ) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4173');
    res.setHeader('Access-Control-Allow-Origin', 'http://hyblab.polytech.univ-nantes.fr');
    
    let POIs;
    // Get partner's topic from folder name
    let json = require(path.join(__dirname, '../src/src/db.json'));
    let key = req.params[0];
    POIs = json[key];
    // Send it as a JSON object
    res.json(POIs);
} );

// Export our API
module.exports = app;
