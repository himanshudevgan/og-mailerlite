'use strict';
const Apikey = require('./../models/apikey');

const api = {
    getapi: async () => {
         let apikey = await Apikey.findOne({});
         return(apikey)
    }
}
module.exports = api;

