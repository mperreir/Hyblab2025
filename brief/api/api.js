'use strict';

const express = require('express');
const router = express.Router(); // Router pour les API

// API endpoint pour envoyer un message
router.get('/message', (req, res) => {
    res.json({ message: 'Bonjour depuis l\'API Express!' });
});


// Export our API (pas besoin de cette ligne pour le démarrage du serveur)
module.exports = router;
