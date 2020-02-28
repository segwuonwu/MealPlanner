const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', (req, res) => {
    db.plan.findOne({
        where: {
            id: req.user.id
        },
        include: [db.user, db.meal]
    }).then(function(plan) {
        if (!plan) {
            // throw Error()
            res.render('profile')
        } else {
            res.render('meal', { plan: plan })
        }

    });
})

// POST /post - create a new post
router.post('/', isLoggedIn, function(req, res) {
    console.log(req.body);
    console.log(req.user)
    db.plan.findOrCreate({
            where: {
                name: "This week's meal",
                userId: req.user.id
            }
        })
        .then(([plan, created]) => {
            db.meal.findOrCreate({
                where: {
                    name: req.body.name,
                    day: req.body.day,
                    time: req.body.time,
                    image: req.body.image
                }
            }).then(([meal, created]) => {
                plan.addMeal(meal).then(meal => {
                    // console.log(meal, 'add to', plan);
                    res.redirect('/meal');
                })
            })
        })
})

module.exports = router;