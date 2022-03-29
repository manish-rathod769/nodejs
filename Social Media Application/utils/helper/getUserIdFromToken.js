const { verify } = require('jsonwebtoken');
const userModel = require('../../model/users/users.model');
const ObjectId = require('mongoose').Types.ObjectId;

let getUserID = async (req, res) => {
  try{
    const accessToken = req.cookies.accessToken;
    if(!accessToken) throw new Error('Please Login First !!!');
    const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET); //Return Data od user. Here it will return emailID.
    
    // Check If data exist in database or not
    const matchedUser = await userModel.find({email: payload.emailID});
    
    if(!matchedUser[0]) throw new Error('Data does not exist !!!');
    if(matchedUser[0].accessToken != accessToken) throw new Error('Please Login First !!!');
    return ObjectId(matchedUser[0]._id);
  }catch(e){
    res.render('login', { errorMessage: e.message});
  }
}

module.exports = getUserID;