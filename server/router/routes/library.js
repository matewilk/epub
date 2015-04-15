var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.session.user){
        res.send({title: "Super book", author: "Mateusz Wilk", isbn: "33987429834"});
    } else {
        res.send({access: 'denied'});
    }
});

module.exports = router;
