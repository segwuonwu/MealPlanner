const express = require('express');
const router = express.Router();

let menu = require('../controllers/menu')

/* GET home page. */
router.get('/', menu.get_menu);


module.exports = router;