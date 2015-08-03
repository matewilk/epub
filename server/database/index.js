var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

exports.connect = function(url, done) {
    if(state.db) return done();

    console.log("trying to connect to mongodb");
    MongoClient.connect(url, function(err, db){
        console.log("mongodb callback");
        if(err) return done(err);
        state.db = db;
        done();
    });
};

exports.get = function() {
    return state.db;
};

exports.close = function(done){
    if(state.db) {
        state.db.close(function(err, result){
            state.db = null;
            state.mode = null;
            done(err);
        });
    };
};