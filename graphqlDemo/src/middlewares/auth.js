/* eslint-disable no-console */
const jsonwebtoken = require('jsonwebtoken');

const authentication = async (req) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isAuth = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return isAuth;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = authentication;
