const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const postModel = require('../../model/posts/posts.model');
const getUserID = require('../../utils/helper/getUserIdFromToken');

const allPost = async (req, res) => {
  try{
    const userID = await getUserID(req, res);
    const index = Number(req.params.index) || 2;

    const postData = await postModel.aggregate([{$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {time: -1}}, {$skip: (index-1)*4}, {$limit: 4}]);
    const totalLength = await postModel.find().count();
    let isDataBeforePostData = (index != 1) ? await postModel.aggregate([{$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {time: -1}}, {$limit: (index-1)*4}, {$count: "beforeCount"}]) : [ { beforeCount: 0 }];
    let isDataAfterPostData = (index*4 < totalLength) ? await postModel.aggregate([{$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {time: -1}}, {$skip: index*4}, {$count: "afterCount"}]) : [{ afterCount: 0 }];

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

const profilePost = async (req, res) => {
  try{
    const index = Number(req.params.index) || 1;
    const userID = await getUserID(req, res);
    const uid = req.params.userID;
    if(userID != uid){
      res.render('login', { errorMessage: "User does not exist !!!" });
      return;
    }
    const postData = await postModel.aggregate([{$match: {userID: userID}}, {$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {time: -1}}, {$skip: (index-1)*4}, {$limit: 4}]);
    
    const totalLength = await postModel.find({userID}).count();
    let isDataBeforePostData = (index != 1) ? await postModel.aggregate([{$match: {userID: ObjectId(userID)}}, {$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {time: -1}}, {$limit: (index-1)*4}, {$count: "beforeCount"}]) : [ { beforeCount: 0 }];
    let isDataAfterPostData = (index*4 < totalLength) ? await postModel.aggregate([{$match: {userID: ObjectId(userID)}}, {$lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'userDetails'}}, {$project: {postBy: '$userDetails.email', _id: 1, title: 1, image: 1, description: 1, userID: 1, time: 1, likes: 1}}, {$unwind: '$postBy'}, {$sort: {time: -1}}, {$skip: index*4}, {$count: "afterCount"}]) : [{ afterCount: 0 }];
    
    const paginationDetails = { before: isDataBeforePostData[0].beforeCount, after: isDataAfterPostData[0].afterCount, current: index };
    postData.forEach( post => {
      let likedUsers = post.likes;
      let flag = likedUsers.some( like => like.toString() === userID.toString());
      post.flag = flag;
    });
    res.render('profilePost', { userID, postData, paginationDetails, errorMessage: ""});
  }catch(e){
    res.render('profilePost', { errorMessage: e.message });
  }
}

const addPost = async (req, res) => {
  try{
    const userID = await getUserID(req, res);
    const postDetails = new postModel({
      title: req.body.title,
      image: req.file.filename,
      description: req.body.description,
      userID,
      time: new Date()
    });

    await postDetails.save()
    .then( () => {
      res.redirect(`/posts/${userID}/1`);
    });
  }catch(e){
    res.render('addPost', { errorMessage: e.message, userID });
  }
}

const likePost = async (req, res) => {
  const userID = await getUserID(req, res);
  const postID = req.body.pid;
  // let matchedPost = {};
  const matchedPost = await postModel.find({_id: postID}).populate("users");
  console.log(matchedPost[0].users);
  // res.json(matchedPost);
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

const editPost = async(req, res) => {
  try{
    const postID = ObjectId(req.params.pid);
    const userID = await getUserID(req, res);
    const title = req.body.title;
    const description = req.body.description;
    const time = new Date();
    
    // const matchedPost_ = await postModel.aggregate([{$match: {_id: postID, userID}}])
    // if(!matchedPost_[0]) throw new Error('Data does not exist !!!');
    // const filePath = path.resolve(__dirname, '../../db/Images/');
    // await fs.promises.unlink(`${filePath}/${matchedPost_[0].image}`);
    const matchedPost = await postModel.aggregate([{$match: {_id: postID, userID}}])
    if(!matchedPost[0]) throw new Error('Data does not exist !!!');
    await postModel.findByIdAndUpdate({_id: postID}, {title, description, time});
    res.redirect(`/posts/${userID}/1`);
  }catch(e){
    res.render('editPost', { errorMessage: e.message, postData: [] });
  }
}

const deletePost = async (req, res) => {
  try{
    const userID = await getUserID(req, res);
    const postID = ObjectId(req.body.pid);

    const matchedPost = await postModel.aggregate([{$match: {_id: postID, userID}}])
    if(!matchedPost[0]) throw new Error('Data does not exist !!!');
    const filePath = path.resolve(__dirname, '../../db/Images/')
    await fs.promises.unlink(`${filePath}/${matchedPost[0].image}`);
    await postModel.findByIdAndDelete({_id: postID, userID});
    res.json({isDeleted: true});
  }catch(e){
    res.json({ isDeleted: false, error: e.message });
  }
}

const renderToAddPost = async (req, res) => {
  const userID = await getUserID(req, res);
  console.log(userID);
  try {
    res.render('addPost', { errorMessage: "", userID});
  }catch(e){
    res.render('addPost', { errorMessage: e.message, userID});
  }

}

module.exports = {
  allPost,
  profilePost,
  addPost,
  likePost,
  editPost,
  deletePost,
  renderToAddPost
}