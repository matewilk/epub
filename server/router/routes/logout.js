var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.contentType('application/json');

    req.session.destroy();
    res.send({logout: true});
});

module.exports = router;