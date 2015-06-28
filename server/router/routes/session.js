var express = require('express');
var router = express.Router();
var login = require('./functions/login');
var session = require('./functions/session');

router.post('/', login.post);

router.get('/', session.get);

router.delete('/', login.delete);

module.exports = router;
