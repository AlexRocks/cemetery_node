'use strict';

/*
 *
 ID: A hidden field assinged by the program.
 marker ID: The unique identifying name or number that you use to distinguish an individual marker.
 marker Name: A common name for the marker.
 GPS polygon location: This is a boundary drawn around the marker that will display on a Google map.
 Description: This is a free flowing text box that can contain any inforamation that you want to include.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;


/**
 * marker Schema
 */
var MarkerModelSchema = new Schema({
    marker_id: {
        type: String,
        default: ''
    },
    marker_section_id: {
        type: String,
        default: ''
    },
    marker_cemetery_id: {
        type: String,
        default: ''
    },
    marker_plot_id: {
        type: String,
        default: ''
    },
    marker_name: {
        type: String,
        default: ''
    },
    marker_lat: {
        type: String,
        default: ''
    },
    marker_lng: {
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
        type: Object,
        default: false
    },
    marker_documents: {
        type: Object,
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
    },
    section: {
        type: Schema.ObjectId,
        ref: 'Section'
    },
    plot: {
        type: Schema.ObjectId,
        ref: 'Plot'
    }
});

/**
 * Validations
 */
MarkerModelSchema.path('marker_name').validate(function(marker_name) {
    return marker_name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
MarkerModelSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('MarkerModel', MarkerModelSchema);
