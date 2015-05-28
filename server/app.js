var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var MongoStore = require('connect-mongo')(session)

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'wszczebrzeszyniechrzaszczbrzmiwtrzcinie',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        db: 'test',
        host: 'localhost',
        port: 27017
    })
}));

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    },
    onFileUploadStart: function(file, req, res) {
        console.log('file upload start');
        console.log('fileupload done: '+app.fileuploaddone);
    },
    onFileUploadData: function(file, data, req, res) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived');
    },
    onFileUploadComplete: function(file, req, res) {
        console.log('file upload complete');
        app.fileuploaddone = true;
        console.log('fileupload done: '+app.fileuploaddone);
    }
}));
app.fileuploaddone = false;


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    //serve uploads
    app.use('/static', express.static('uploads'));

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
        console.log(err.message);
    });
}

if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

/**
 * DB connection
 */
var dbUrl;
if(app.get('env') === 'development'){
    dbUrl = "mongodb://localhost:27017/test";
}
if(app.get('env') === 'production'){
    dbUrl = "NOT KNOWN YET"
}
var db = require('./database');

db.connect(dbUrl, function(err){
    if(err) {
        console.log('Unable to connect to MongoDB');
    } else {
        console.log('MongoDB connected successfully!');
    }
});


/**
 * Routes
 */
var router = require('./router')(app);

module.exports = app;
