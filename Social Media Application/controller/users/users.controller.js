const { hash } = require('bcrypt');
const { compare } = require('bcrypt');
const { verify } = require('jsonwebtoken');

const insertDocument = require('../../utils/helper/insertDocument.helper');
const { createAccessToken, sendAccessToken } = require('../../utils/helper/token');
const getUserID = require('../../utils/helper/getUserIdFromToken');

const userModel = require('../../model/users/users.model');

const indexRoute = async (req, res) => {
  try{
    res.render('index');
  }catch(e){
    res.status(404).json({ is_error: true, message: e.message });
  }
}

const userRegister = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password) throw new Error("Please provies all details of user...");
    const encryptedPassword = await hash(password, 10);
    
    await userModel.find()
    .then( users => {
      users.forEach(user => {
        if(user.email === email) throw new Error("Email already exist !!!");
      });
    });

    const userDetails = new userModel({
      name,
      email,
      password: encryptedPassword
    })
    insertDocument(req, res, userDetails, "User Registration Successfull...");
  }catch(e){
    res.render('register', { errorMessage: e.message });
  }
}

const userLogin = async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password) throw new Error("Email or password cannot be blank");

    let matchedUser = {};
    await userModel.find()
    .then( records => {
      matchedUser = records.filter(record => record.email === email);
    });

    if(!matchedUser.length) throw new Error("Email does not exist in database!!!");
    const matchedPassword = await compare(password, matchedUser[0].password);
    if(!matchedPassword) throw new Error("Password does not match!!!");
    
    const accessToken = createAccessToken(matchedUser[0].email);
    await userModel.findByIdAndUpdate( matchedUser[0]._id, { accessToken})
    .then( () => {
      sendAccessToken(req, res, accessToken);
    })
  }catch(e){
    res.render('login', { errorMessage: e.message });
  }
}

const userLogout = async(req, res) => {
  try{
    const userID = getUserID(req, res);
    res.clearCookie('accessToken');
    res.redirect('/');
  }catch(e){
    res.status(200).json({ is_error: true, message: e.message});
  }
}

module.exports = {
  indexRoute,
  userRegister,
  userLogin,
  userLogout
}