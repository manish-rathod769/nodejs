const mongoose = require('mongoose');

const adminAndRectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String
  }
});

const adminModel = mongoose.model('admins', adminAndRectorSchema);
const rectorModel = mongoose.model('rectors', adminAndRectorSchema);

module.exports = {
  adminModel,
  rectorModel
}