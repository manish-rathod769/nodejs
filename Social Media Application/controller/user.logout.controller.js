const { verify } = require('jsonwebtoken');
const userRegisterModel = require('../model/user.register.model');

let userLogout = async(req, res) => {
  try{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) throw new Error('Please Login First !!!');
    const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); //Return Data od user. Here it will return emailID.
    
    // Check If data exist in database or not
    const matchedUser = await userRegisterModel.find({email: payload.emailID});
    
    if(!matchedUser[0]) throw new Error('Data does not exist !!!');
    if(matchedUser[0].refreshToken != refreshToken) throw new Error('Please Login First !!!');
    res.clearCookie('refreshToken');
    res.redirect('/');
  }catch(e){
    res.status(200).json({ is_error: true, message: e.message});
  }
}

module.exports = userLogout;