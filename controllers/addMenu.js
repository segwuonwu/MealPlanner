var express = require('express');
var router = express.Router();

// GET /addMenu - return a page to add foods
router.get('/', function(req, res) {
    // TODO: Get all records from the DB and render to view
    res.render('day');
});

router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    console.log(req.bod)
    res.redirect('/day');
});


module.exports = router;