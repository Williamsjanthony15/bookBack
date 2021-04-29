'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema ({
  name: String, 
  description: String,
  status: String,
});

const userSchema = new Schema ({
 email: String,
 books: [bookSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User; 

