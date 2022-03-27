const postModel = require('../model/user.addPost.model');
const getUserID = require('../utils/helper/getUserIdFromToken');

let userProfilePost = async (req, res) => {
  try{
    const userID = await getUserID(req, res);
    const postData = await postModel.aggregate([{$match: {userID: userID}}, {$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {_id: -1}}]);

    postData.forEach( post => {
      let likedUsers = post.likes;
      let flag = likedUsers.some( like => like.toString() === userID.toString());
      post.flag = flag;
    });
    res.render('profilePost', { postData, errorMessage: ""});
  }catch(e){
    res.render('profilePost', { errorMessage: e.message });
  }
}

module.exports = userProfilePost;