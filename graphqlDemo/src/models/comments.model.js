const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    postId: {
      type: ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model('comments', commentSchema);
module.exports = commentModel;
