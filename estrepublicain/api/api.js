'use strict';

const app = require( 'express' )();
const path = require('path');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// app.get('/videos', async (req, res) => {
//     // Récupération des artistes
//     const response = await fetch(`/estrepublicain/public/data/videos.json`);
//     // Gestion des erreurs
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     // Conversion en textex
//     // Envoi du résultat
//     res.send(JSON.stringify(response));
// });

// Export our API
module.exports = app;
