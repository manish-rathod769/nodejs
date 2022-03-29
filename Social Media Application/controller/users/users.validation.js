const joi = require('joi');
const userModel = require('../../model/users/users.model');

const registerValidation = joi.object({
  name: joi.string().trim(true).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(5).trim(true).required()
})

const userRegisterValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  const { error } = registerValidation.validate(payload);
  if(error){
    res.render('register', { errorMessage: error.message });
  }else{
    next();
  }
}

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const userLoginValidation = async (req, res, next) => {
  const payload = {
    email: req.body.email,
    password: req.body.password
  };
  const { error } = loginValidation.validate(payload);
  if(error){
    res.render('login', { errorMessage: error.message });
  }else{
    next();
  }
}

module.exports = {
  userRegisterValidation,
  userLoginValidation
}