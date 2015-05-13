var express = require('express');
var router = express.Router();
var login = require('./functions/login');

router.get('/', login.delete);

module.exports = router;