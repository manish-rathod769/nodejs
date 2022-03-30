const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  hostelCode: {
    type: Number,
    required: true
  }
});

const hosteModel = mongoose.model('hostels', hostelSchema);
module.exports = hosteModel;