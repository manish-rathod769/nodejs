const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const postModel = require('../../model/user.addPost.model');
const getUserID = require('../../utils/helper/getUserIdFromToken');

let userEditPostMiddleware = async (req, res) => {
  try{
    const postID = ObjectId(req.params.pid);
    const userID = ObjectId(await getUserID(req, res));
    const matchedPost = await postModel.aggregate([{$match: {_id: postID, userID}}])
  
    if(!matchedPost[0]) throw new Error('Data does not exist !!!');
    res.render('editPost', { errorMessage: '', postData: matchedPost});
  }catch(e){
    res.render('editPost', { errorMessage: 'Data does not exist !!!'});
  }
}

module.exports = userEditPostMiddleware;