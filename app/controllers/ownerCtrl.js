'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Owner = mongoose.model('OwnerModel'),
        _ = require('lodash');


/**
 * Find owner by id
 */
exports.owner = function(req, res, next, id) {
    Owner.load(id, function(err, owner) {
        if (err)
            return next(err);
        if (!owner)
            return next(new Error('Failed to load owner ' + id));
        req.owner = owner;
        next();
    });
};

/**
 * Create an owner
 */
exports.create = function(req, res) {
    var owner = new Owner(req.body);
    owner.user = req.user;

    owner.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                owner: owner
            });
        } else {
            res.jsonp(owner);
        }
    });
};

/**
 * Update an acmCemetery
 */
exports.update = function(req, res) {
    var owner = req.owner;

    owner = _.extend(owner, req.body);
    owner.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                owner: owner
            });
        } else {
            res.jsonp(owner);
        }
    });
};

/**
 * Delete an owner
 */
exports.destroy = function(req, res) {
    var owner = req.owner;

    owner.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                owner: owner
            });
        } else {
            res.jsonp(owner);
        }
    });
};

/**
 * Show an owner
 */
exports.show = function(req, res) {
    res.jsonp(req.owner);
};

/**
 * List of owners
 */
exports.all = function(req, res) {
    Owner.find().sort('-created').populate('user', 'name username').exec(function(err, owners) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(owners);
        }
    });
};

