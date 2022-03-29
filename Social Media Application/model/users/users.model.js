const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  accessToken: {
    type: 'string'
  }
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;