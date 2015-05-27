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
    }
};

module.exports = files;
