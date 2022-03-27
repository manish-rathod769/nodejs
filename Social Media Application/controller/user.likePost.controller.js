const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const getUserID = require('../utils/helper/getUserIdFromToken');
const postModel = require('../model/user.addPost.model');
// const likePostModel = require('../model/user.likePost.model');

let userLikePost = async (req, res) => {
  const userID = await getUserID(req, res);
  const postID = req.body.pid;
  // let matchedPost = {};
  const matchedPost = await postModel.find({_id: postID});

  if(!matchedPost.length) throw new Error("Post does not exist !!!");
  const isAlreadyLiked = await postModel.find({ _id: postID, likes: {$in: [userID]}});
  
  // If user have already likes or disliked or not
  if(isAlreadyLiked.length){
    await postModel.findOneAndUpdate({ _id:postID }, {$pull: {likes: userID}});
    const likeCount = await postModel.aggregate([{$match: {_id: ObjectId(postID)}}, {$project: {_id: 0, count: {$size: '$likes'}}}]);
    res.json({ isLiked: false, likeCount: likeCount[0] });
  }else{
    await postModel.findOneAndUpdate({ _id:postID }, {$push: {likes: userID}});
    const likeCount = await postModel.aggregate([{$match: {_id: ObjectId(postID)}}, {$project: {_id: 0, count: {$size: '$likes'}}}]);
    res.json({ isLiked: true, likeCount: likeCount[0] });
  }
}

module.exports = userLikePost;