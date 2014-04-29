'use strict';

/*
 * 
ID: A hidden field assinged by the program.
plot ID: The unique identifying name or number that you use to distinguish an individual plot.
plot Name: A common name for the plot.
GPS polygon location: This is a boundary drawn around the plot that will display on a Google map.
Description: This is a free flowing text box that can contain any inforamation that you want to include.
*/

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * plot Schema
 */
var PlotModelSchema = new Schema({
    plot_id: {
        type: String,
        default: ''
    },
    
    plot_section_id: {
        type: String,
        default: ''
    },
    
    plot_cemetery_id: {
        type: String,
        default: ''
    },
    
    plot_name: {
        type: String,
        default: ''
    },

    plot_lat: {
        type: String,
        default: ''
    },
    
    plot_lng: {
        type: String,
        default: ''
    },
    
    plot_gps: {
        type: Object,
        default: ''
    },
       
    plot_description: {
        type: String,
        default: '',
        trim: true
    },
    
    plot_created_date: {
        type: Date,
        default: Date.now
    },
    
    plot_updated_date: {
        type: Date,
        default: Date.now
    },
    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    
    section: {
        type: Schema.ObjectId,
        ref: 'Section'
    }
});

/**
 * Validations
 */
PlotModelSchema.path('plot_name').validate(function(plot_name) {
    return plot_name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
PlotModelSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('PlotModel', PlotModelSchema);
