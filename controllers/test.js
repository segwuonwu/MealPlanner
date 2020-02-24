const express = require('express');
const router = express.Router();

router.get('/test1', (req, res) => {
    res.send('test1');
});

router.get('/:sweetParam', (req, res) => {
    res.render(req.params.sweetParam);
});

module.exports = router;