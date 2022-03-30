const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: Number,
    required: true
  },
  floorID: {
    type: ObjectId,
    required: true
  },
  roomCapacity: {
    type: Number,
    required: true,
    min: 1
  }
});

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;