const express = require('express');
const router = express.Router();
const json = require('./data.json');

router.get('/hello', (req, res) => {
    res.send('Hello World!');
});

router.get('/data', (req, res) => {
    res.json(json);
});

router.get('/:player', (req, res) => {
    const { player } = req.params;
    res.json(json[player]);
});

router.get('/:player/quiz', (req, res) => {
    const { player } = req.params;
    res.json(json[player].quiz);
});

router.get('/:player/article', (req, res) => {
    const { player } = req.params;
    const articles = json[player].articles
    res.json(articles);
});

router.get('/:player/stats', (req, res) => {
    const { player } = req.params;
    const stats = json[player].stats
    res.json(stats);
});

router.get('/:player/article/:id', (req, res) => {
    const { player, id } = req.params;
    const article = json[player].articles.find((article) => article.id === id);
    res.json(article);
});

router.get('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot! ☕️");
});

module.exports = (app) => {
    app.use('/api', router); // Préfixe toutes les routes avec /api
};