var express = require('express');
var router = express.Router();
var files = require('./functions/files');

router.get('/', files.get);

module.exports = router;
