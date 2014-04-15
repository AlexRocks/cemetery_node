'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Grave = mongoose.model('Grave'),
    _ = require('lodash');


/**
 * Find grave by id
 */
exports.grave = function(req, res, next, id) {
    Grave.load(id, function(err, grave) {
        if (err) return next(err);
        if (!grave) return next(new Error('Failed to load grave ' + id));
        req.grave = grave;
        next();
    });
};

/**
 * Create an grave
 */
exports.create = function(req, res) {
    var grave = new Grave(req.body);
    grave.user = req.user;

    grave.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                grave: grave
            });
        } else {
            res.jsonp(grave);
        }
    });
};

/**
 * Update an grave
 */
exports.update = function(req, res) {
    var grave = req.grave;

    grave = _.extend(grave, req.body);

    grave.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                grave: grave
            });
        } else {
            res.jsonp(grave);
        }
    });
};

/**
 * Delete an grave
 */
exports.destroy = function(req, res) {
    var grave = req.grave;

    grave.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                grave: grave
            });
        } else {
            res.jsonp(grave);
        }
    });
};

/**
 * Show an grave
 */
exports.show = function(req, res) {
    res.jsonp(req.grave);
};

/**
 * List of Graves
 */
exports.all = function(req, res) {
    Grave.find().sort('-created').populate('user', 'name username').exec(function(err, graves) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(graves);
        }
    });
};
