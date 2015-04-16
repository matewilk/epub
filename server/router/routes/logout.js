var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    res.contentType('application/json');

    req.session.destroy();
    res.send(true);
});

module.exports = router;