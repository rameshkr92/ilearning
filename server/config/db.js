"use strict";
// serverconfig/db.js
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/elearning');

module.exports = connection;