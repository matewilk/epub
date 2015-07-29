module.exports = (function(){

    var db = require('../../database'),
        extfs = require("extfs"),
        ObjectId = require('mongodb').ObjectID;

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

    var getGuestUserFile = function(req, callback){
        var guestuserDir = new RegExp(req.cookies.guestuser);
        db.get().collection('files').findOne({path: guestuserDir}, function(err, file){
            //check if file exists in the dir (is in sync with the db)
            //or if file path exists (if not - first time guestuser)
            var isEmptyDir = file && file.path ? extfs.isEmptySync(file.path.replace(/\/[^\/]+$/, '')) : true;
            file = isEmptyDir ? null : file;
            callback(file);
        });
    };

    var deleteBook = function(id, callback){
        db.get().collection('files').findOne({_id: ObjectId(id)}, {path: 1}, function(err, file){
            if(err) return err;

            var filePath = file.path;
            db.get().collection('files').remove({_id: ObjectId(id)}, function(err, result){
                if(err) return err;

                callback(filePath, result.result.n);
            })
        });
    };

    return {
        saveFile: saveFile,
        getAllFiles: getAllFiles,
        getGuestUserFile: getGuestUserFile,
        deleteBook: deleteBook
    }
})();
