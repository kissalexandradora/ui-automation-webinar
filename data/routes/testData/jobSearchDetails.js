const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Test data');
});

module.exports = router;