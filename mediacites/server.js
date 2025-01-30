// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');

// Create our application
const app = express();

// Load and register our REST API
const api = require('./api/api');
app.use('/api', api);

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need
app.get(`/article`, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/article.html'));
});

app.get(`/navigation`, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/navigation.html'));
});

app.get(`/`, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get(`/motion`, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get(`/info`, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/info.html'));
});

app.get(`/info`, function (req, res) {
    res.sendFile(path.join(__dirname, '/public/info.html'));
});

app.get('/test-api', (req, res) => {
    console.log('Test API route hit');
    res.send('API is working');
});

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
