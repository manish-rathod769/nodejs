const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: ObjectId,
      required: true,
    },
    authorId: {
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
