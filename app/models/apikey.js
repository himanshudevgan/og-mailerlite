'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apikeySchema = new Schema({
  
    ogapikey: {
        type: String,
        required: true,
    },

    mlapikey: {
        type: String,
        required: true,
    },
  
},
{
    timestamps: true,
    autoIndex: true
});
const Apikey = mongoose.model('Apikey', apikeySchema);
module.exports = Apikey;