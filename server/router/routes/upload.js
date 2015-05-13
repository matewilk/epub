var express = require('express');
var router = express.Router();
var files = require('./functions/files');

router.post('/', files.post);

module.exports = router;
