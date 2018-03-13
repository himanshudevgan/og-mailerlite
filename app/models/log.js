'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Calcgroup = require('./../models/calcgroup');
const logSchema = new Schema({
  
    request: {
        type: String,
        required: true,
        
    },
    response: {
        type: String,
        default: true
    }  
},
{
    timestamps: true,
    autoIndex: true
});
const log = mongoose.model('Log', logSchema);
module.exports = log;