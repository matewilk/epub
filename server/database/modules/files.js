module.exports = (function(){

    var db = require('../../database');

    var saveFile = function(file, callback){
        db.get().collection('files').insert(file, function(err, result){
            if(err) return err;

            var noFilesInserted = result.result.n;
            callback(noFilesInserted);
        });
    };

    var getAllFiles = function(callback){
        db.get().collection('files').find().toArray(function(err, files){
            if(err) return err;

            callback(files);
        });
    };

    return {
        saveFile: saveFile,
        getAllFiles: getAllFiles
    }
})();
