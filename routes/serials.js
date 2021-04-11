var express = require('express');
const serial_controlers= require('../controllers/serial');
var router = express.Router();
/* GET serials */
router.get('/', serial_controlers.serial_view_all_Page );
/* GET detail serial page */
router.get('/detail', serial_controlers.serial_view_one_Page);


module.exports = router; 