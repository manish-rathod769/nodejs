const { verify } = require('jsonwebtoken');
const { adminModel, rectorModel } = require('../model/admin/admin.rector.model');

let validateAccessToken = async (req, res, next) => {
  try{
    let accessType = req.path.split('/')[1];
    const authorizationToken = req.headers['authorization']; // It will return whateve we have passed in authorization header (Access Token)
    if(!authorizationToken) throw new Error("Please Provide Access Token!!!");
    const accessToken = authorizationToken.split(" ")[1]; // Returns Access Token
    
    const loginDetails = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if(loginDetails){
      let model = (accessType === 'admin') ? adminModel : rectorModel;
      let matchedDocs = await model.find({email: loginDetails.emailID});
      if(accessToken != matchedDocs[0].accessToken) throw new Error("Access token does not match!!!");
      next();
    }
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

module.exports = validateAccessToken;