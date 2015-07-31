var express = require('express');
var path = require('path');
var fs = require("fs");
var extfs = require("extfs");
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

//set a cookie for not logged in users
app.use(function (req, res, next){
    var cookie = req.cookies.guestuser;
    if(cookie === undefined){
        var randomNo = Math.random().toString();
        randomNo = randomNo.substring(2, randomNo.length);
        //one year guestuser cookie
        res.cookie('guestuser', randomNo, { maxAge: 31556952000, httpOnly: false});
    }
    next();
});

app.use(multer({
    dest: './uploads/',
    limits: { fileSize: 10* 1024 * 1024}, //10mb
    changeDest: function(dest, req, rest) {
        var newDest = dest + req.cookies.guestuser;
        var stat = null;
        try {
            stat = fs.statSync(newDest);
        } catch (err) {
            fs.mkdirSync(newDest);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory already exists "' + dest + '"');
        }
        return newDest;
    },
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    },
    onFileUploadStart: function(file, req, res) {
        //stop file upload if guestuser dir is not empty (only one book allowed)
        var isEmptyDir = extfs.isEmptySync(file.path.replace(/\/[^\/]+$/, ''));
        if(!isEmptyDir){
            app.fileuploadcancelled = true;
            return isEmptyDir;
        }
    },
    onFileUploadData: function(file, data, req, res) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived');
    },
    onFileUploadComplete: function(file, req, res) {
        app.fileuploaddone = true;
    }
}));
app.fileuploaddone = false;
app.fileuploadcancelled = false;


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
    dbUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/test";;
}
if(app.get('env') === 'production'){
    dbUrl = process.env.MONGOLAB_URI;
}
var db = require('./database');
dbUrl = "mongodb://testuser:testpassword@ds029787.mongolab.com:29787/heroku_7t803rsz";
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

/**
 * Push state
 *
 * change path for production /dist
 */
//app.post('/reader/logout', function(req, res){
//    debugger;
//});
//handle /reader/logout route
//handle /reader/ route when user not logged in
app.get('*', function(req, res){
    fs.createReadStream("../client/app/index.html").pipe(res);
});

module.exports = app;
