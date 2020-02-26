var express = require('express');
var router = express.Router();

// GET /addMenu - return a page to add foods
router.get('/', function(req, res) {
    // TODO: Get all records from the DB and render to view
    res.send('Render a page to add foods');
});

// POST /addMenu - receive the name of a food and add it to the database
router.post('/add', function(req, res) {
    // TODO: Get form data and add a new record to DB
    res.send(req.body);
});

module.exports = router;