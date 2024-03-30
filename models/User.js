import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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

const User = model('User', userSchema);

export default User;
