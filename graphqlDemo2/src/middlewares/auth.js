const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models/index');

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || 'dummy.jwt.token';
    const paylpoad = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // Check if user exisr or not
    const user = await User.findById(paylpoad.id);
    if (!user) {
      return next();
    }
    req.user = paylpoad;
    return next();
  } catch (error) {
    return next();
  }
};

module.exports = authentication;
