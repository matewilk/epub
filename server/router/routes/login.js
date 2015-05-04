var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    if(req.body.password.value == 'pass'){
        req.session.user = req.body.email.value;
        res.send(true);
    } else {
        res.send(false);
    }
});

module.exports = router;
