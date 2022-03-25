const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userID: {
    type: ObjectId,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
})

const postModel = mongoose.model('posts', postSchema);
module.exports = postModel;