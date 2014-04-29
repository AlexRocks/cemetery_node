'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Plot = mongoose.model('PlotModel'),
	Section = mongoose.model('SectionModel'),
	Cemetery = mongoose.model('CemeteryModel'),
    _ = require('lodash');


/**
 * Find plot by id
 */
exports.plot = function(req, res, next, id) {

	console.log("Find plot by id");
	
    Plot.load(id, function(err, plot) {
        if (err) return next(err);
        if (!plot) return next(new Error('Failed to load plot ' + id));
		
		console.info(plot);		
		
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
	
	Section.load(req.body.plot_section_id, function(err, section) {
	
        if (err) return next(err);
        if (!section) return next(new Error('Failed to load section ' + id));
        
		plot.section = section._id;
		plot.cemetery = section.cemetery._id;

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

    });
};

/**
 * Update 
 */
exports.update = function(req, res) {
    var plot = req.plot;
    plot = _.extend(plot, req.body);
	
	Section.load(req.body.plot_section_id, function(err, section) {
	
        if (err) return next(err);
        if (!section) return next(new Error('Failed to load section ' + id));
        
		plot.section = section._id;
		plot.cemetery = section.cemetery._id;

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
	console.log("List of plots");
    Plot.find().sort('-created')/*.populate('section').populate('cemetery')*/.populate('user', 'name username').exec(function(err, plots) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(plots);
        }
    });
};
