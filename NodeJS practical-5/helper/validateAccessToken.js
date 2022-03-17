const { verify } = require('jsonwebtoken');
const { adminModel, rectorModel } = require('../model/models');

let validateAccessToken = async (req, res, next) => {
  try{
    const token = req.headers.cookie;
    let accessType = req.path.split('/')[1];
    if(!token) throw new Error("Please provide refresh token!!!");
    const authorizationToken = req.headers['authorization']; // It will return whateve we have passed in authorization header (Access Token)
    if(!authorizationToken) throw new Error("Please Provide Access Token!!!");
    const accessToken = authorizationToken.split(" ")[1]; // Returns Access Token
    const loginDetails = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if(loginDetails){
      let model = (accessType === 'admin') ? adminModel : rectorModel;
      let matchedDocs = await model.find({email: loginDetails.emailID})
      // console.log(matchedDocs[0].refreshToken);
      if(token != matchedDocs[0].refreshToken) throw new Error("Refresh token does not match!!!");
      next();
    }
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

module.exports = validateAccessToken;