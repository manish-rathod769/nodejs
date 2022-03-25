const joi = require('joi');

const validation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const userLoginValidation = async (req, res, next) => {
  const payload = {
    email: req.body.email,
    password: req.body.password
  };
  const { error } = validation.validate(payload);
  if(error){
    res.render('login', { errorMessage: error.message });
    // res.json({ is_error: true, message: error.message });
  }else{
    next();
  }
}

module.exports = userLoginValidation;