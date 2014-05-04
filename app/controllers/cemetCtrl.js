'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Cemet = mongoose.model('CemetModel'),
        _ = require('lodash');


/**
 * Find cemet by id
 */
exports.cemet = function(req, res, next, id) {
    Cemet.load(id, function(err, cemet) {
        if (err)
            return next(err);
        if (!cemet)
            return next(new Error('Failed to load cemet ' + id));
        req.cemet = cemet;
        next();
    });
};

/**
 * Create an cemet
 */
exports.create = function(req, res) {
    var cemet = new Cemetery(req.body);
    cemet.user = req.user;

    cemet.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                cemet: cemet
            });
        } else {
            res.jsonp(cemet);
        }
    });
};

/**
 * Update an cemet
 */
exports.update = function(req, res) {
    var cemet = req.cemet;

    cemet = _.extend(cemet, req.body);

    cemet.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                cemet: cemet
            });
        } else {
            res.jsonp(cemet);
        }
    });
};

/**
 * Delete an cemet
 */
exports.destroy = function(req, res) {
    var cemet = req.cemet;

    cemet.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                cemet: cemet
            });
        } else {
            res.jsonp(cemet);
        }
    });
};

/**
 * Show an cemet
 */
exports.show = function(req, res) {
    res.jsonp(req.cemet);
};

exports.getOne = function(req, res) {
    res.jsonp(req.cemet);
};

/**
 * List of cemets
 */
exports.all = function(req, res) {
    Cemet.find().sort('-created').populate('user', 'name username').exec(function(err, cemets) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(cemets);
        }
    });
};
