'use strict';

const app = require( 'express' )();
const path = require('path');
const cors = require('cors');

/*
app.use(cors({
    origin: ['https://hyblab.polytech.univ-nantes.fr/lanouvellerepublique/map?animal=Loutre', 'http://localhost:5173', 'http://localhost:4173'],
}));
*/

// Sample endpoint that sends the partner's name
app.get('/animals/*', function ( req, res ) {
    res.setHeader('Access-Control-Allow-Origin', 'https://hyblab.polytech.univ-nantes.fr/lanouvellerepublique/map');
    let POIs;
    // Get partner's topic from folder name
    let json = require(path.join(__dirname, '../src/src/data/db.json'));
    let key = req.params[0];
    POIs = json[key];
    // Send it as a JSON object
    res.json(POIs);
} );

// Export our API
module.exports = app;
