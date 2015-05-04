var express = require('express');
var router = express.Router();

router.get('/authenticated', function(req, res){
    if(req.session.user){
        res.send({authenticated: true});
    } else {
        res.send({authenticated: false});
    }
});

module.exports = router;
