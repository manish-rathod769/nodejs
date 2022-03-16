const { verify } = require('jsonwebtoken');

let validateAccessToken = (req, res, next) => {
  try{
    const token = req.cookies.refreshToken;
    if(!token) throw new Error("Please Login First!!!");
    const authorizationToken = req.headers['authorization']; // It will return whateve we have passed in authorization header (Access Token)
    if(!authorizationToken) throw new Error("Please Provide Access Token!!!");
    const accessToken = authorizationToken.split(" ")[1]; // Returns Access Token
    const loginDetails = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if(loginDetails) next();
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

module.exports = validateAccessToken;