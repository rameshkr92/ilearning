"use strict";
// server/config/db.js
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/ilearning');

module.exports = connection;