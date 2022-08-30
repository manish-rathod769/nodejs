const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const postModel = mongoose.model('posts', postSchema);
module.exports = postModel;
