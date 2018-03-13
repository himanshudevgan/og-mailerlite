'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Calcgroup = require('./../models/calcgroup');
const logSchema = new Schema({
    linkid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Calcgroup',

    },
    request: {
        type: String,
        required: true,
        
    },
    response: {
        type: Boolean,
        default: true
    }  
},
{
    timestamps: true,
    autoIndex: true
});
const log = mongoose.model('loggroup', logSchema);
module.exports = log;