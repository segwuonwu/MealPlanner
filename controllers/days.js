const express = require('express');
const router = express.Router();
const db = require('../models');

// POST /post - create a new post
router.post('/', function(req, res) {
    db.dayofweek.create({
            name: req.body.title,
            menuId: req.body.menuId
        })
        .then(function(post) {
            res.redirect('/')
        })
        .catch(function(error) {
            res.status(400).render('main/404')
        })
})

router.get('/:id', function(req, res) {
    db.dayofweek.findOne({
        include: [db.dayofweek],
        where: { id: req.params.id }
    }).then(function(day) {
        res.render('day/show', { day: day })
    }).catch(function(error) {
        console.log(error)
        res.status(400).render('main/404')
    })
})


module.exports = router;