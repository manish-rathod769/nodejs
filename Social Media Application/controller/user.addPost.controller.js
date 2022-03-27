const { verify } = require('jsonwebtoken');
const userRegisterModel = require('../model/user.register.model');
const postModel = require('../model/user.addPost.model');

let userUploadImage = async (req, res) => {
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) throw new Error('Please Login First !!!');
    const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); //Return Data od user. Here it will return emailID.
    
    // Check If data exist in database or not
    const matchedUser = await userRegisterModel.find({email: payload.emailID});
    
    if(!matchedUser[0]) throw new Error('Data does not exist !!!');
    if(matchedUser[0].refreshToken != refreshToken) throw new Error('Please Login First !!!');
    const userID = matchedUser[0]._id;

    const postDetails = new postModel({
      title: req.body.title,
      image: req.file.filename,
      description: req.body.description,
      userID: matchedUser[0]._id,
      time: new Date()
    });

    await postDetails.save()
    .then( () => {
      res.redirect('/profile');
    });
  }catch(e){
    res.render('addPost', { errorMessage: e.message });
  }
}

module.exports = userUploadImage;