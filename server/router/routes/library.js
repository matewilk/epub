var express = require('express');
var router = express.Router();
var files = require('./functions/files');

router.get('/', files.get);

router.delete('/:id', files.delete);

module.exports = router;
