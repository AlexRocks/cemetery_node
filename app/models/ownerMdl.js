'use strict';

/*
 *
 ID: A hidden field assinged by the program.
 Owner ID: The unique identifying name or number that you use to distinguish an individual owner.
 Owner Name: A common name for the owner.
 GPS polygon location: This is a boundary drawn around the owner that will display on a Google map.
 Description: This is a free flowing text box that can contain any inforamation that you want to include.
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;


/**
 * Owner Schema
 */

var Documents = new Schema({
    mtime: String
    , type: String
    , name: String
    , path: String
    , size: Number
});

var OwnerModelSchema = new Schema({
    owner_id: {
        type: String,
        default: ''
    },
    owner_first_name: {
        type: String,
        default: ''
    },
    owner_last_name: {
        type: String,
        default: ''
    },
    owner_middle_name: {
        type: String,
        default: ''
    },
    owner_organization: {
        type: String,
        default: ''
    },
    owner_billing_address: {
        address1: {
            type: String,
            default: ''
        },
        address2: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        postalcode: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        }
    },
    owner_email: {
        type: String,
        default: '',
        trim: true
    },
    owner_documents: [Documents],
    owner_notes: {
        type: String,
        default: '',
        trim: true
    },
    owner_created_date: {
        type: Date,
        default: Date.now
    },
    owner_updated_date: {
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
OwnerModelSchema.path('owner_first_name').validate(function(owner_first_name) {
    return owner_first_name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
OwnerModelSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('OwnerModel', OwnerModelSchema);
