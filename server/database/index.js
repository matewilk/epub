module.exports = function(app){
    var MongoClient = require('mongodb').MongoClient;
    var dbUrl;
    var _db;

    if(app.get('env') === 'development'){
        dbUrl = "mongodb://localhost:27017/local";
    }
    if(app.get('env') === 'production'){
        dbUrl = "NOT KNOWN YET"
    }

    MongoClient.connect(dbUrl, function(err, db){
        if(err) return err;
        _db = db;
        console.log('MongoDB connected successfully.');
        app.db = db;
    });

    return {
        getDbConnection: function(){
            return _db;
        }
    }
};