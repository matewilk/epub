module.exports = function(app){

    var express = require('express');
    var router = express.Router();

    router.post('/', function(req, res){
        if(app.fileuploaddone === true){
            console.log(req.files);
            res.end("File uploaded.");
            app.fileuploaddone = false;
        }
    });

    return router;
};