const express = require('express');
const router = express.Router();
const db = require('../models');

// POST /post - create a new post
router.post('/', function(req, res) {
    console.log(req.body);
    db.meal.findOrCreate({
            where: {
                name: req.body.name
            }
        })
        .then(([meal, created]) => {
            db.plan.create(
                meal.id,
                req.user.id
            )
        })
        .catch(function(error) {
            res.status(400).render('main/404')
        })
})

module.exports = router;