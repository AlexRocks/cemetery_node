'use strict';

/*
 * 
ID: A hidden field assinged by the program.
Section ID: The unique identifying name or number that you use to distinguish an individual section.
Section Name: A common name for the section.
GPS polygon location: This is a boundary drawn around the section that will display on a Google map.
Description: This is a free flowing text box that can contain any inforamation that you want to include.
*/

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Section Schema
 */
var SectionModelSchema = new Schema({
    section_id: {
        type: String,
        default: ''
    },
    
    section_cemetery: {
        type: String,
        default: ''
    },
    
    section_cemetery_id: {
        type: String,
        default: ''
    },
    
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
    
    cemetery: {
        type: Schema.ObjectId,
        ref: 'CemeteryModel'
    }
});

/**
 * Validations
 */
SectionModelSchema.path('section_name').validate(function(section_name) {
    return section_name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
SectionModelSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('SectionModel', SectionModelSchema);
