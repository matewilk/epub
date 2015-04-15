var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    res.contentType('application/json');

    res.session.destroy();
    res.send(true);
});

module.exports = router;