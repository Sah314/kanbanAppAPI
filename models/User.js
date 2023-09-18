const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  boardids:{
    type:Array,
  },
  jwtToken: {
    type: String, // Store the JWT token here
  },
  jwtExpiresAt: {
    type: Date, // Store the JWT expiration date here
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
