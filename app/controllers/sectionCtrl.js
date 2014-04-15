'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Section = mongoose.model('SectionModel'),
    _ = require('lodash');


/**
 * Find section by id
 */
exports.section = function(req, res, next, id) {
    Section.load(id, function(err, section) {
        if (err) return next(err);
        if (!section) return next(new Error('Failed to load section ' + id));
        req.section = section;
        next();
    });
};

/**
 * Create an section
 */
exports.create = function(req, res) {
    var section = new Section(req.body);
    section.user = req.user;

    section.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                section: section
            });
        } else {
            res.jsonp(section);
        }
    });
};

/**
 * Update an acmCemetery
 */
exports.update = function(req, res) {
    var section = req.section;
    section = _.extend(section, req.body);
    section.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                section: section
            });
        } else {
            res.jsonp(section);
        }
    });
};

/**
 * Delete an section
 */
exports.destroy = function(req, res) {
    var section = req.section;

    section.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                section: section
            });
        } else {
            res.jsonp(section);
        }
    });
};

/**
 * Show an section
 */
exports.show = function(req, res) {
    res.jsonp(req.section);
};

/**
 * List of sections
 */
exports.all = function(req, res) {
    Section.find().sort('-created').populate('user', 'name username').exec(function(err, sections) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sections);
        }
    });
};

/**
 * List of sections of cemetery
 */
exports.showCemeterySection = function(req, res) {
    
    console.log(req);


    
    Section.find().sort('-created').populate('user', 'name username').exec(function(err, sections) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sections);
        }
    });
};
