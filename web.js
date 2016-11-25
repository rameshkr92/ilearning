"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');

var models_user = require('./server/models/user.js');
// config files
var db = require('./server/config/db');
//connection database
// mongoose.connect(config.db);

//import the routers
var router = require('./server/routes/routes'); // configure our routes
var authenticate = require('./server/routes/auth')(passport);

var app = express();
//tell node that My application will use ejs engine for rendering, view engine setup
app.set('views', path.join(__dirname, 'client/public/views'));
// app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// configuration ===========================================

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

//tell node the global configuration about parser,logger and passport
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat'
}));
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); //initializing passport
app.use(passport.session()); //initializing passport session
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/client/public'));

// routes ==================================================
app.use('/', router);
app.use('/auth', authenticate);
//providing auth-api to passport so that it can use it.
var initPassport = require('./server/passport/passport-init');
initPassport(passport);
// start app ===============================================
//running server on node
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});


// expose app           
exports = module.exports = app;                         
