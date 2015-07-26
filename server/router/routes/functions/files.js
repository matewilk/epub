var filesDb = require('../../../database/modules/files'),
    fs = require('fs');

var files = {
    'post': function(req, res){
        if(req.app.fileuploaddone === true){

            var callback = function(noFilesInserted){
                req.app.fileuploaddone = false;
                res.end(noFilesInserted + " File uploaded.");
            };

            filesDb.saveFile(req.files.file, callback);
        }
    },
    'get': function(req, res){
        var callback = function (files) {
            res.send(files);
        };
        if(req.session.user) {
            filesDb.getAllFiles(callback);
        } else if(req.cookies.guestuser) {
            filesDb.getGuestUserFile(req, callback);
        } else {
            res.send({access: 'denied'});
        }
    },
    'delete': function(req, res){
        var id = req.params.id;
        var callback = function(filePath, result) {
            if(result === 1){
                fs.unlink(filePath, function(){
                    res.send(result);
                });
            } else {
                res.send(result);
            }

        };
        filesDb.deleteBook(id, callback);
    }
};

module.exports = files;
