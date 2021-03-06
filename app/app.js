const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').load();
require('dotenv').config();
const Router = require('./routes/route');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/', Router);
app.use(express.static(__dirname + '/public'));
module.exports = app;