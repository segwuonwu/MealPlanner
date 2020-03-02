const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', (req, res) => {
    db.plan.findOne({
        where: {
            userId: req.user.id
        },
        include: [db.user, db.meal]
    }).then(function(plan) {
        if (!plan) {
            // throw Error()
            res.render('profile')
        } else {
            res.render('meal', { plan: plan })
        }
    }).catch(function(error) {
        console.log(error)
        res.status(400).render('main/404')
    });
})

// POST /post - create a new post
router.post('/', isLoggedIn, function(req, res) {
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
                    res.redirect('/meal');
                })
            })
        }).catch(function(error) {
            console.log(error)
            res.status(400).render('main/404')
        })
})

// DELETE single meal
// app.use(methodOverride('_method'));
router.delete('/:id', (req, res) => {
    console.log('---------- delete route-------------')
    db.meal.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/meal');
        }).catch(function(error) {
            console.log(error)
            res.status(400).render('main/404')
        });
});

module.exports = router;