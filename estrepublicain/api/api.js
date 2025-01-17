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
app.get('/videos', function (req, res) {
    let videos;

    try {
        // Get videos.json
        videos = require('../public/data/videos.json');

        // Check if videos object is empty
        if (Object.keys(videos).length === 0) {
            return res.status(404).json({ error: 'No videos available' });
        }

        // Send it as a JSON object
        res.json({ videos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load videos' });
    }
});

// Endpoint that sends the video corresponding to a category
app.get('/videos/:category', function (req, res) {
    let videos;
    let category = req.params.category;
    let filteredVideos = {};

    try {
        // Get videos.json
        videos = require('../public/data/videos.json');

        // Check if videos object is empty
        if (Object.keys(videos).length === 0) {
            return res.status(404).json({ error: 'No videos available' });
        }

        // Filter videos by category
        for (let videoId in videos) {
            if (videos[videoId].tags.includes(category)) {
                filteredVideos[videoId] = videos[videoId];
            }
        }

        // Check if any videos match the category
        if (Object.keys(filteredVideos).length === 0) {
            return res.status(404).json({ error: 'No videos found for this category' });
        }

        // Send it as a JSON object
        res.json({ videos: filteredVideos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load videos' });
    }
});


// Export our API
module.exports = app;
