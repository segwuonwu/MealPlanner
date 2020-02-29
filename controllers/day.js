const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:day', (req, res) => {
    db.plan.findOne({
        where: {
            userId: req.user.id
        },
        include: [db.user, db.meal]
    }).then(function(plan) {
        if (!plan) {
            res.render('noMeal')
        } else {
            console.log(req.params.day)
            var selected = plan.meals.filter(meal => meal.dataValues.day.toLowerCase() === req.params.day)
            if (!plan.meals) throw Error()
            res.render('day', { plan: plan, meals: selected })
        }
    }).catch(function(error) {
        console.log(error)
        res.status(400).render('main/404')
    })
})

router.post('/', (req, res) => {
    db.plan.findOne({
            where: {
                userId: req.user.id
            },
            include: [db.meal]
        })
        .then(function(plan) {
            var hasPlan = plan.meals.filter(meal => {
                (meal.dataValues.day.toLowerCase() === req.params.day) && (meal.dataValues.time === req.params.time)
            })
            db.meal.findOrCreate({
                where: {
                    name: req.body.name,
                    day: req.body.day,
                    time: req.body.time,
                    image: req.body.image
                }
            })
            if (hasPlan.length) {
                plan.addMeal(meal).then(() => {
                    if (meal) {
                        res.redirect(`day/:${req.body.day.toLowerCase()}`);
                    }
                })
            }
        }).catch(function(error) {
            console.log(error)
            res.status(400).render('main/404')
        });
})


module.exports = router;