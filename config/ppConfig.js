const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

/*
 * Passport "serializes" objects to make them easy to store, converting the
 * user to an identifier (id)
 */
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function(id, cb) {
    db.user.findByPk(id).then(function(user) {
        cb(null, user);
    }).catch(cb);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, cb) {
    db.user.findOne({
        where: { email }
    }).then(function(user) {
        if (!user || !user.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
        }
    }).catch(cb);
}));

// export the Passport configuration from this module
module.exports = passport;