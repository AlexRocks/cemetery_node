'use strict';

/*
 *
 ** Cemetery **
 ID: A hidden field assigned by the program.
 Cemetery ID: The unique identifying name or number that you use to distinguish an individual cemetery.
 Cemetery Name: A common name for the cemetery.
 GPS Point Location: This is a simple point in the center of the cemetery that will direct users to the general location by Google maps.
 Description: This is a free flowing text box that can contain any inforamation that you want to include.


 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var Docs = new Schema({
    mtime: String
    , type: String
    , name: String
    , path: String
    , size: Number
});

var Images = new Schema({
    mtime: String
    , type: String
    , name: String
    , path: String
    , size: Number
});

var Markers = new Schema({
    marker_name: {
        type: String,
        default: ''
    },
    marker_gps: {
        type: Object,
        default: ''
    },
    marker_description: {
        type: String,
        default: '',
        trim: true
    },
    marker_human_verified: {
        type: Boolean,
        default: false
    },
    marker_images: {
        type: [Images],
        default: false
    },
    marker_documents: {
        type: [Docs],
        default: false
    },
    marker_created_date: {
        type: Date,
        default: Date.now
    },
    marker_updated_date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

var Plots = new Schema({
    plot_name: {
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
    markers: [Markers]
});

var Sections = new Schema({
    section_name: {
        type: String,
        default: ''
    },
    section_gps: {
        type: Object,
        default: ''
    },       
    section_description: {
        type: String,
        default: '',
        trim: true
    },    
    section_created_date: {
        type: Date,
        default: Date.now
    },    
    section_updated_date: {
        type: Date,
        default: Date.now
    },    
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    plots: [Plots]
});

var CemetModelSchema = new Schema({
    sections: [Sections],
    cemetery_name: {
        type: String,
        default: ''
    },
    cemetery_gps: {
        type: Object,
        default: ''
    },
    cemetery_description: {
        type: String,
        default: '',
        trim: true
    },
    cemetery_created_date: {
        type: Date,
        default: Date.now
    },
    cemetery_updated_date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
CemetModelSchema.path('cemetery_name').validate(function(cemetery_name) {
    return cemetery_name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
CemetModelSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('CemetModel', CemetModelSchema);
