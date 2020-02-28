const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:day', (req, res) => {
    db.plan.findOne({
        where: {
            id: req.user.id
        },
        include: [db.user, db.meal]
    }).then(function(plan) {
        var selected = plan.meals.filter(meal => meal.dataValues.day === req.params.day)
        if (!plan.meals) throw Error()
        res.render('day', { plan: plan, meals: selected })
    });
})


module.exports = router;