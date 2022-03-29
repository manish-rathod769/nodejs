const joi = require('joi');
const multer = require('multer');
const path = require('path');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const postModel = require('../../model/posts/posts.model');
const getUserID = require('../../utils/helper/getUserIdFromToken');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../db/Images"));
  },
  filename: async (req, file, callback) => {
    const userID = await getUserID(req, "");
    callback(null, userID + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const isUserEditPostExist = async (req, res) => {
  try{
    const postID = ObjectId(req.params.pid);
    const userID = await getUserID(req, res);
    const matchedPost = await postModel.aggregate([{$match: {_id: postID, userID}}])
  
    if(!matchedPost[0]) throw new Error('Data does not exist !!!');
    res.render('editPost', { userID, errorMessage: '', postData: matchedPost});
  }catch(e){
    res.render('editPost', { userID, errorMessage: 'Data does not exist !!!', postData: ""});
  }
}

const addValidation = joi.object({
  title: joi.string().min(3).trim().required(),
  description: joi.string().min(10).trim().required()
});

const addPostValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    description: req.body.description
  };
  const { error } = addValidation.validate(payload);
  if(error){
    res.render('addPost', { errorMessage: error.message });
  }else{
    next();
  }
}

module.exports = {
  upload,
  isUserEditPostExist,
  addPostValidation
};