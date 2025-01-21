const express = require('express');
const router = express.Router();
const json = require('./data.json');

router.get('/hello', (req, res) => {
    res.send('Hello World!');
});

router.get('/data', (req, res) => {
    res.json(json);
});

module.exports = (app) => {
    app.use('/api', router); // Préfixe toutes les routes avec /api
};