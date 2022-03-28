const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const postModel = require('../model/user.addPost.model');

let userDeletePost = async(req, res) => {
  try{
    const postID = ObjectId(req.body.pid);
    await postModel.findByIdAndDelete({_id: postID});
    res.json({isDeleted: true});
  }catch(e){
    res.json({ isDeleted: false, error: e.message });
  }
}

module.exports = userDeletePost;