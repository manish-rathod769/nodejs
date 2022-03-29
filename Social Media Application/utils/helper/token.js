const { sign } = require('jsonwebtoken');

let createAccessToken = emailID => {
  return sign( {emailID}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d"
  });
}

let sendAccessToken = (req, res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true
  });
  res.redirect('/posts/1');
}

module.exports = {
  createAccessToken,
  sendAccessToken
}