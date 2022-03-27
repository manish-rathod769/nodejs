const { sign } = require('jsonwebtoken');

let createAccessToken = emailID => {
  return sign( {emailID}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
}

let createRefreshToken = emailID => {
  return sign( {emailID}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
}

let sendAccessToken = (req, res, accessToken) => {
  // res.status(200).json({ 
  //   is_error: false,
  //   accessToken,
  //   message: "Logged in successfully..."
  // });
  req.flash('accessToken', accessToken);
  res.redirect('/all');
}

let sendRefreshToken = (req, res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true
  });
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken
}