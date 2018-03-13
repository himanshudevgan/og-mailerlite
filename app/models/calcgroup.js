'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const calcgroupSchema = new Schema({
    calcid: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
    },
    parentapp: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },
    mlgid: {
        type: String,
        required: true,
    },
    groupname: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    }  
},
{
    timestamps: true,
    autoIndex: true
});
const Calcgroup = mongoose.model('Calcgroup', calcgroupSchema);
module.exports = Calcgroup;