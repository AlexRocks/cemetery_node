'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Plot = mongoose.model('PlotModel'),
    _ = require('lodash');


/**
 * Find plot by id
 */
exports.plot = function(req, res, next, id) {
    Plot.load(id, function(err, plot) {
        if (err) return next(err);
        if (!plot) return next(new Error('Failed to load plot ' + id));
        req.plot = plot;
        next();
    });
};

/**
 * Create an plot
 */
exports.create = function(req, res) {
    var plot = new Plot(req.body);
    plot.user = req.user;

    plot.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                plot: plot
            });
        } else {
            res.jsonp(plot);
        }
    });
};

/**
 * Update an acmCemetery
 */
exports.update = function(req, res) {
    var plot = req.plot;
    plot = _.extend(plot, req.body);
    plot.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                plot: plot
            });
        } else {
            res.jsonp(plot);
        }
    });
};

/**
 * Delete an plot
 */
exports.destroy = function(req, res) {
    var plot = req.plot;

    plot.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                plot: plot
            });
        } else {
            res.jsonp(plot);
        }
    });
};

/**
 * Show an plot
 */
exports.show = function(req, res) {
    res.jsonp(req.plot);
};

/**
 * List of plots
 */
exports.all = function(req, res) {
    Plot.find().sort('-created').populate('user', 'name username').exec(function(err, plots) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(plots);
        }
    });
};
