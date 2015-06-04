var express = require('express');
var router = express.Router();
var reader = require('./functions/reader');

router.get('/:id', reader.get);

router.get('/:image_id/:folder/*', reader.getImage);

module.exports = router;
