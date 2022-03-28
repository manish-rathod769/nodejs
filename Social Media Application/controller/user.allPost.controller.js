const postModel = require('../model/user.addPost.model');
const getUserID = require('../utils/helper/getUserIdFromToken');

let userAllPost = async (req, res) => {
  try{
    const userID = await getUserID(req, res);
    const index = Number(req.params.index) || 1;
    
    const postData = await postModel.aggregate([{$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {_id: -1}}, {$skip: (index-1)*4}, {$limit: 4}]);
    const totalLength = await postModel.find().count();
    let isDataBeforePostData = (index != 1) ? await postModel.aggregate([{$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {_id: -1}}, {$limit: (index-1)*4}, {$count: "beforeCount"}]) : [ { beforeCount: 0 }];
    let isDataAfterPostData = (index*4 <= totalLength) ? await postModel.aggregate([{$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {_id: -1}}, {$skip: index*4}, {$count: "afterCount"}]) : [{ afterCount: 0 }];
    
    const paginationDetails = { before: isDataBeforePostData[0].beforeCount, after: isDataAfterPostData[0].afterCount, current: index };
    postData.forEach( post => {
        let likedUsers = post.likes;
        let flag = likedUsers.some( like => like.toString() === userID.toString());
        post.flag = flag;
    });
    res.render('allPost', { postData, userID, paginationDetails, errorMessage: ""});
  }catch(e){
    res.render('allPost', { errorMessage: e.message });
  }
}

module.exports = userAllPost;