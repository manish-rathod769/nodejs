const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const userModel = require('../../model/users/users.model');
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
    required: true,
  },
  time: {
    type: Date,
    required: true
  },
  likes: {
    type: [ObjectId]
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
)

postSchema.virtual("users", {
  ref: userModel,   //must be changed to the name you used for Comment model.
  foreignField: "_id",
  localField: "userID"
});

const postModel = mongoose.model('posts', postSchema);
module.exports = postModel;