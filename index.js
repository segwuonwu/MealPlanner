require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const methodOverride = require("method-override");
const db = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());
app.use(methodOverride('_method'));

const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    save: false,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // must come after session

app.use(function(req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});

app.use('*', require('./controllers/index'));
app.use('/menu', require('./controllers/menu'));
app.use('/meal', require('./controllers/meal'))
app.use('/day', require('./controllers/day'))

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;