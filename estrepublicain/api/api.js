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

// Endpoint that sends all the videos
app.get('/videos', function ( req, res ) {
    let videos;

    // Get videos.json
    videos = require( '../public/data/videos.json' );
    // Send it as a JSON object
    res.json({videos});
} );

// Endpoint that sends the video correponding to a category
app.get('/videos/:category', function (req, res) {
    let videos;
    let category = req.params.category;
    let filteredVideos = {};

    // Get videos.json
    videos = require('../public/data/videos.json');

    // Filter videos by category
    for (let videoId in videos) {
        if (videos[videoId].tags.includes(category)) {
            filteredVideos[videoId] = videos[videoId];
        }
    }

    // Send it as a JSON object
    res.json({ videos: filteredVideos });
});

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
