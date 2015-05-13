var express = require('express');
var router = express.Router();
var login = require('./functions/login');

router.post('/', login.post);

module.exports = router;
