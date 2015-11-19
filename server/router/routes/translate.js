var express = require('express');
var router = express.Router();
var translate = require('./functions/translate');

router.post('/', translate.post);

module.exports = router;
