const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: ['^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', 'Please enter a valid email address!!!'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
