const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const postModel = require('../model/user.addPost.model');
const getUserID = require('../utils/helper/getUserIdFromToken');

let userEditPost = async(req, res) => {
  try{
    const postID = ObjectId(req.params.pid);
    const userID = await getUserID(req, res);
    const title = req.body.title;
    const description = req.body.description;
  
    const matchedPost = await postModel.aggregate([{$match: {_id: postID, userID}}])
    if(!matchedPost[0]) throw new Error('Data does not exist !!!');
    await postModel.findByIdAndUpdate({_id: postID}, {title, description});
    res.redirect('/profile');
  }catch(e){
    res.render('editPost', { errorMessage: e.message });
  }
}

module.exports = userEditPost;