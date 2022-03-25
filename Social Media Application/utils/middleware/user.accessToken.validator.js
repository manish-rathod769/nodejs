// const generateNewAccessToken = require('../helper/generateNewAccessToken');
const { verify } = require('jsonwebtoken');
const userRegisterModel = require('../../model/user.register.model');

let userAccessTokenValidator = async (req, res, next) => {
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) throw new Error('Please Login First !!!');
    const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); //Return Data od user. Here it will return emailID.
    
    // Check If data exist in database or not
    const matchedUser = await userRegisterModel.find({email: payload.emailID});
    
    if(!matchedUser[0]) throw new Error('Data does not exist !!!');
    if(matchedUser[0].refreshToken != refreshToken) throw new Error('Please Login First !!!');

    // let accessToken = req.flash('accessToken');
    // accessToken = accessToken[accessToken.length - 1];

    // const payload2 = await verify(accessToken, process.env.ACCESS_TOKEN_SECRET); //Return Data od user. Here it will return emailID.
    
    // Check If data exist in database or not
    // const matchedUser2 = await userRegisterModel.find({email: payload2.emailID});
    
    // if(!matchedUser2[0]) throw new Error('Data does not exist !!!');
    next()

  }catch(e){
    res.render('login', { errorMessage: e.message });
    // res.json({ is_error: true, message: e.message});
  }
}

module.exports = userAccessTokenValidator;