module.exports = function(req, res, next) {
    // check is there's no user
    if (!req.user) {
        // send scathing message
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/auth/login');
    } else {
        next();
    }
}