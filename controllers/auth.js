const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

//Ideally, we want to already be logged in after signup. 
//We can modify the signup route to call the passport.authenticate function again.
router.post('/signup', (req, res) => {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(([user, created]) => {
        if (created) {
            console.log("User created");
            //res.redirect('/');    
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in',
            })(req, res);
        } else {
            console.log('Email already exists');
            req.flash('error', 'Email already exists');
            res.redirect('/auth/signup');
        }
    }).catch(err => {
        console.log('🙀Error occured finding or creating user');
        console.log(err)
        req.flash('error', err.message);
        res.redirect('/auth/signup');
    });
})


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username or password',
    successFlash: 'You have logged in'
}));

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
});


module.exports = router;