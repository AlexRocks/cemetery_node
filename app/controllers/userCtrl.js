'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        User = mongoose.model('User'),
        _ = require('lodash');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err)
                return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {

    console.info('exports.me!');


    res.jsonp(req.user || null);
};



/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {

    console.info('exports.user');

    User
            .findOne({
                _id: id
            })
            .exec(function(err, user) {
                if (err)
                    return next(err);
                if (!user)
                    return next(new Error('Failed to load User ' + id));
                req.profile = user;
                next();
            });
};


/**
 * Update
 */
exports.update = function(req, res) {

    console.log("UPD USER NOW");



    var user = req.user;

    user = _.extend(user, req.body);
    user.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                user: user
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Delete an marker
 */
exports.destroy = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                user: user
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Show an marker
 */
exports.show = function(req, res) {

    console.log("Show user");

    res.jsonp(req.user);
};

/**
 * List of sections
 */
exports.all = function(req, res) {

    console.log("Search for users");


    User.find().sort('-created').populate('user', 'name username').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};