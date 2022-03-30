const { sign } = require('jsonwebtoken');

let createAccessToken = emailID => {
  return sign( {emailID}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d"
  });
}

let sendAccessToken = (req, res, accessToken) => {
  res.status(200).json({ 
    accessToken,
    message: "Logged in successfully..."
  });
}

module.exports = {
  createAccessToken,
  sendAccessToken,
}