'use strict';

const app = require( 'express' )();
const path = require('path');
const cors = require('cors');


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://hyblab.polytech.univ-nantes.fr/lanouvellerepublique/map?animal=Loutre'],
}));


// Sample endpoint that sends the partner's name
app.get('/animals/*', function ( req, res ) {
    
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
