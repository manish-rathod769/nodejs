const userRegisterModel = require('../model/user.register.model');
const { compare } = require('bcrypt');
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('../utils/helper/token');

let userLogin = async (req, res) => {
  // console.log("Inside Login Route...")
  try{
    const { email, password } = req.body;
    if(!email || !password) throw new Error("Email or password cannot be blank");

    let matchedUser = {};
    await userRegisterModel.find()
    .then( records => {
      matchedUser = records.filter(record => record.email === email);
    });

    if(!matchedUser.length) throw new Error("Email does not exist in database!!!");
    const matchedPassword = await compare(password, matchedUser[0].password);
    if(!matchedPassword) throw new Error("Password does not match!!!");
    
    const accessToken = createAccessToken(matchedUser[0].email);
    const refreshToken = createRefreshToken(matchedUser[0].email);
    await userRegisterModel.findByIdAndUpdate( matchedUser[0]._id, { refreshToken})
    .then( () => {
      sendRefreshToken(req, res, refreshToken);
      sendAccessToken(req, res, accessToken);
    })
  }catch(e){
    res.render('login', { errorMessage: e.message });
    // res.json({ is_error: true, message: e.message});
  }
}

module.exports = userLogin;