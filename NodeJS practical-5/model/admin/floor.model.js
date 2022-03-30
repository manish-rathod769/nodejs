const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const floorSchema = new mongoose.Schema({
  floorCode: {
    type: Number,
    required: true
  },
  hostelID : {
    type: ObjectId,
    required: true
  }
});

const floorModel = mongoose.model('floors', floorSchema);
module.exports = floorModel;