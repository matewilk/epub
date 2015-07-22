var filesDb = require('../../../database/modules/files');

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
        if(req.session.user) {
            var callback = function (files) {
                res.send(files);
            };

            filesDb.getAllFiles(callback);
        } else if(req.cookies.guestuser) {
            var callback = function(file) {
                res.send(file);
            };

            filesDb.getGuestUserFile(req, callback);
        } else {
            res.send({access: 'denied'});
        }
    }
};

module.exports = files;
