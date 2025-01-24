'use strict';

const app = require( 'express' )();
const path = require('path');
const videos = require("../public/data/videos.json");

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

// Endpoint that sends the video corresponding to its ID
app.get('/video/:id', function (req, res) {
    const videoId = parseInt(req.params.id, 10);

    try {
        // Get videos.json
        const videos = require('../public/data/videos.json');

        // Check if videos object is empty
        if (!videos || videos.length === 0) {
            return res.status(404).json({ error: 'No videos available' });
        }

        // Find the video by ID
        const video = videos.find(v => v.id === videoId);

        // Check if the video exists
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Send the video as a JSON object
        res.json({ video });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load video', details: error.message });
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

app.get('/related/:podcastId/:nbPodcast', function (req, res) {
    let podcasts;
    let podcastId = parseInt(req.params.podcastId, 10);
    let nbPodcast = parseInt(req.params.nbPodcast, 10);
    let relatedPodcasts = [];
    let tags = [];

    try {
        // Get podcasts.json
        podcasts = require('../public/data/videos.json');

        // Check if podcasts object is empty
        if (Object.keys(podcasts).length === 0) {
            return res.status(404).json({ error: 'No podcasts available' });
        }

        // Find the podcast by ID
        let podcast = podcasts.find(p => p.id === podcastId);

        // Check if the podcast exists
        if (!podcast) {
            return res.status(404).json({ error: 'Podcast not found' });
        }

        // Get tags from the podcast
        tags = podcast.tags;

        // Check if the podcast has tags
        if (tags.length === 0) {
            return res.status(404).json({ error: 'No tags found for this podcast' });
        }

        // Find the podcasts with the most tags in common
        for (let p of podcasts) {
            if (p.id !== podcastId) {
                let commonTags = p.tags.filter(tag => tags.includes(tag));
                if (commonTags.length > 0) {
                    relatedPodcasts.push({
                        podcast: p,
                        commonTags: commonTags
                    });
                }
            }
        }

        // Sort by the number of common tags in descending order
        relatedPodcasts.sort((a, b) => b.commonTags.length - a.commonTags.length);

        // Get the top related podcasts
        relatedPodcasts = relatedPodcasts.slice(0, nbPodcast);

        // Send the related podcasts and their common tags as a JSON array
        res.json({ relatedPodcasts });
    } catch (error) {
        // Send the error in the status
        res.status(500).json({ error: 'Failed to load podcasts', details: error.message });
    }
});

// Endpoint that sends the videos of the same department of a given video
app.get('/department/:videoId', function (req, res) {
    const videoId = parseInt(req.params.videoId, 10);
    const departmentVideos = [];

    try {
        // Get videos.json
        const videos = require('../public/data/videos.json');

        // Check if videos object is empty
        if (!videos || videos.length === 0) {
            return res.status(404).json({ error: 'No videos available' });
        }

        // Find the video by ID
        const video = videos.find(v => v.id === videoId);

        // Check if the video exists
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Get the department of the video
        const department = video.Department;

        // Check if the video has a department
        if (!department) {
            return res.status(404).json({ error: 'No department found for this video' });
        }

        // Find the videos of the same department
        videos.forEach(v => {
            if (v.Department === department && v.id !== videoId) {
                departmentVideos.push(v);
            }
        });

        // Check if any videos match the department
        if (departmentVideos.length === 0) {
            return res.status(404).json({ error: 'No videos found for this department' });
        }
        // Send it as a JSON array
        res.json({ videos: departmentVideos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load videos' });
    }
});

// Endpoint that sends the videos of the same decade of a given video
app.get('/decade/:videoId', function (req, res) {
    const videos = require('../public/data/videos.json');
    const videoId = parseInt(req.params.videoId, 10);
    const video = videos.find(v => v.id === videoId);

    if (!video) {
        return res.status(404).json({ error: 'Video not found' });
    }

    const videoYear = parseInt(video.Date, 10);
    if (isNaN(videoYear)) {
        return res.status(400).json({ error: 'Invalid video date' });
    }

    const startDecade = Math.floor(videoYear / 10) * 10;
    const endDecade = startDecade + 9;

    const decadeVideos = videos.filter(v => {
        const year = parseInt(v.Date, 10);
        return !isNaN(year) && year >= startDecade && year <= endDecade && v.id !== videoId;
    });

    res.json({ videos: decadeVideos });
});



// Export our API
module.exports = app;