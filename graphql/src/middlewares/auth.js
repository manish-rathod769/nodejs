/* eslint-disable no-console */
const jsonwebtoken = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    return next();
  } catch (error) {
    console.log('Authentication failed!!!', error.message);
    return next();
  }
};

module.exports = authentication;
