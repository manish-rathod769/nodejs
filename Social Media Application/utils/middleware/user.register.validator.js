const joi = require('joi');

const validation = joi.object({
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
  const { error } = validation.validate(payload);
  if(error){
    res.json({ is_error: true, message: error.message });
  }else{
    next();
  } 
}

module.exports = userRegisterValidation;  