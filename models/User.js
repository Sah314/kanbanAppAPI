import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
});


const User = model('User', userSchema);

export default User;
