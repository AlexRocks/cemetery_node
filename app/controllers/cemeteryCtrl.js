'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Cemetery = mongoose.model('CemeteryModel'),
        _ = require('lodash');


/**
 * Find acmCemetery by id
 */
exports.acmCemetery = function(req, res, next, id) {
    Cemetery.load(id, function(err, acmCemetery) {
        if (err)
            return next(err);
        if (!acmCemetery)
            return next(new Error('Failed to load acmCemetery ' + id));
        req.acmCemetery = acmCemetery;
        next();
    });
};

/**
 * Create an acmCemetery
 */
exports.create = function(req, res) {
    var cemetery = new Cemetery(req.body);
    cemetery.user = req.user;

    cemetery.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                acmCemetery: cemetery
            });
        } else {
            res.jsonp(cemetery);
        }
    });
};

/**
 * Update an acmCemetery
 */
exports.update = function(req, res) {
    var cemetery = req.acmCemetery;

    cemetery = _.extend(cemetery, req.body);

    cemetery.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                acmCemetery: cemetery
            });
        } else {
            res.jsonp(cemetery);
        }
    });
};

/**
 * Delete an acmCemetery
 */
exports.destroy = function(req, res) {
    var cemetery = req.acmCemetery;

    cemetery.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                acmCemetery: cemetery
            });
        } else {
            res.jsonp(cemetery);
        }
    });
};

/**
 * Show an acmCemetery
 */
exports.show = function(req, res) {
    res.jsonp(req.acmCemetery);
};

exports.getOne = function(req, res) {
    console.log("GEt ONE");
    console.log(req.acmCemetery);


    res.jsonp(req.acmCemetery);
};

/**
 * List of acmCemeterys
 */
exports.all = function(req, res) {
    Cemetery.find().sort('-created').populate('user', 'name username').exec(function(err, cemeterys) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(cemeterys);
        }
    });
};
