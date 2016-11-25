"use strict";

var express = require('express');
var router = express.Router();

module.exports = function(passport){
    //sends successful login state back to view(angular)
    router.get('/success',function(req,res){
        res.send({state: 'success', user: req.user ? req.user: null});
    });
    //send failure login state back to view(angular)
    router.get('/failure',function(req,res){
        res.send({state: 'failure',user:null,message:"Invalid username or password"});
    });
    //login requeset
    router.post('/login',passport.authenticate('login',{
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //signup request
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //logout request
    router.get('/signout', function(req, res) {
        req.session.user = null;
        req.logout();
        res.redirect('/');
    });

    return router;
}

/*
module.exports = function(app) {

    var passport = require('passport');
    var mongoose = require('mongoose');
    var LocalStrategy = require('passport-local').Strategy;

    var user = require('./../models/user.js');
    var User = mongoose.model('User');

    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);

    app.use(session({
        store: new MongoStore({
            url: 'mongodb://localhost/elearning'
        }),
        secret: 'codetutorialsecret',
        resave:true,
        saveUninitialized:true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function (username, password, done) {

            User.findOne({username: username}, function (err, user) {

                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {alert: 'Incorrect username.'});
                }
                if (user.password != password) {
                    return done(null, false, {alert: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }

    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    function isAuthenticated(req,res,next){
        if(req.isAuthenticated())return next();
        res.send(401);
    }


    app.post('/auth/login', passport.authenticate('local'),function(req, res){
        res.json(req.user);
    });


    app.get('/auth/currentuser',isAuthenticated,function(req,res){
        res.json(req.user);
    });

    app.post('/auth/signup',function(req,res){
        var u =  new User();
        u.username = req.body.email;
        u.password = req.body.password;
        u.lastname = req.body.lastname;
        u.firstname = req.body.firstname;
        u.email = req.body.email;

        u.save(function(err){
            if (err) {
                res.json({'alert':'Registration error'});
            }else{
                res.json({'alert':'Registration success'});
            }
        });
    });

    app.get('/auth/logout', function(req, res){
        console.log('logout');
        req.logout();
        res.send(200);
    });

};
 */