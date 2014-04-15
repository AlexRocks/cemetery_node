'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Marker = mongoose.model('MarkerModel'),
        _ = require('lodash');


/**
 * Find marker by id
 */
exports.marker = function(req, res, next, id) {
    Marker.load(id, function(err, marker) {
        if (err)
            return next(err);
        if (!marker)
            return next(new Error('Failed to load marker ' + id));
        req.marker = marker;
        next();
    });
};

/**
 * Create an marker
 */
exports.create = function(req, res) {
    var marker = new Marker(req.body);
    marker.user = req.user;

    marker.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                marker: marker
            });
        } else {
            res.jsonp(marker);
        }
    });
};

/**
 * Update an acmCemetery
 */
exports.update = function(req, res) {
    var marker = req.marker;

    console.info("UPDATE MARKER");

    console.info(req.body);

    marker = _.extend(marker, req.body);
    marker.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                marker: marker
            });
        } else {
            res.jsonp(marker);
        }
    });
};

/**
 * Delete an marker
 */
exports.destroy = function(req, res) {
    var marker = req.marker;

    marker.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                marker: marker
            });
        } else {
            res.jsonp(marker);
        }
    });
};

/**
 * Show an marker
 */
exports.show = function(req, res) {
    res.jsonp(req.marker);
};

/**
 * List of markers
 */
exports.all = function(req, res) {
    Marker.find().sort('-created').populate('user', 'name username').exec(function(err, markers) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(markers);
        }
    });
};



exports.downloadfile = function(req, res) {
    res.set({
        'Content-Disposition': 'attachment; filename="a.csv"',
        'Content-Type': 'text/csv'
    });

    res.send("\"a\",\"b\"\n1,2\n3,4"); // Hard coded example.
};