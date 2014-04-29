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


/**
 * Article Schema
 */
var CemeteryModelSchema = new Schema({
    acmCemetery_id: {
        type: String,
        default: ''
    },
    acmCemetery_name: {
        type: String,
        default: ''
    },
    acmCemetery_gps: {
        type: Object,
        default: ''
    },
    acmCemetery_lat: {
        type: Number,
        default: ''
    },
    acmCemetery_lng: {
        type: Number,
        default: ''
    },
    acmCemetery_description: {
        type: String,
        default: '',
        trim: true
    },
    acmCemetery_created_date: {
        type: Date,
        default: Date.now
    },
    acmCemetery_updated_date: {
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
CemeteryModelSchema.path('acmCemetery_name').validate(function(acmCemetery_name) {
    return acmCemetery_name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
CemeteryModelSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('CemeteryModel', CemeteryModelSchema);
