const { sign } = require('jsonwebtoken');

let createAccessToken = emailID => {
  return sign( {emailID}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h"
  });
}

let createRefreshToken = emailID => {
  return sign( {emailID}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
}

let sendAccessToken = (req, res, accessToken) => {
  res.status(200).json({ 
    accessToken,
    message: "Logged in successfully..."
  });
  res.end()
}

let sendRefreshToken = (req, res, refreshToken, cookiePath) => {
  cookiePath.forEach( path => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: path
    });
  });
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken
}