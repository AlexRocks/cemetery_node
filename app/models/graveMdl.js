'use strict';

/*
 *
 ID: A hidden field assigned by the program.
 Grave ID: The unique identifying name or number that you use to the distinguish an individual grave.
 First Name: Left blank if unpurchased.
 Middle Name: Left blank if unpurchased.
 Last Name: Left blank if unpurchased.
 Date of Birth: Left blank if unpurchased.
 Date of Death: Left blank if unoccupied.
 Interment Date: Left blank if unoccupied.
 Purchase Date: Left blank if unpurchased.
 Purchase Price: Left blank if unpurchased.
 Owner ID: Selected from a drop-down of owners. Left blank if unpurchased.
 Documents: Ability to upload documents associated with the grave (deeds, certificates, etc.).
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
var GraveSchema = new Schema({
    grave_id: {
        type: String,
        default: ''
    },
    grave_section_id: {
        type: String,
        default: ''
    },
    grave_cemetery_id: {
        type: String,
        default: ''
    },
    grave_plot_id: {
        type: String,
        default: ''
    },
    grave_marker_id: {
        type: String,
        default: ''
    },
    grave_owner_id: {
        type: String,
        default: ''
    },
    grave_first_name: {
        type: String,
        default: ''
    },
    grave_middle_name: {
        type: String,
        default: ''
    },
    grave_last_name: {
        type: String,
        default: ''
    },
    grave_birth_date: {
        type: Date,
        default: null
    },
    grave_death_date: {
        type: Date,
        default: null
    },
    grave_interment_date: {
        type: Date,
        default: null
    },
    grave_purchase_date: {
        type: Date,
        default: null
    },
    grave_purchase_price: {
        type: String,
        default: null
    },
    grave_description: {
        type: String,
        default: '',
        trim: true
    },
    grave_documents: {
        type: Object,
        default: '',
        trim: true
    },
    grave_created_date: {
        type: Date,
        default: Date.now
    },
    grave_updated_date: {
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

 GraveSchema.path('title').validate(function(title) {
 return title.length;
 }, 'Title cannot be blank');

 /**
 * Statics
 */
GraveSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Grave', GraveSchema);
