const mongoose = require('mongoose');

const userRegisterSchema = mongoose.Schema({
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
  refreshToken: {
    type: 'string'
  }
})

const userRegisterModel = mongoose.model('users', userRegisterSchema);
module.exports = userRegisterModel;