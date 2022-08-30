/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const generateToken = (email) => {
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
  return token;
};

module.exports = generateToken;
