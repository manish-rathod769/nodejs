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
  }
})

const userRegisterModel = mongoose.model('users', userRegisterSchema);
module.exports = userRegisterModel;