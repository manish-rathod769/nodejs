const joi = require('joi');

const validation = joi.object({
  title: joi.string().min(3).trim().required(),
  description: joi.string().min(10).trim().required()
});

const userAddPostValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    description: req.body.description
  };
  const { error } = validation.validate(payload);
  if(error){
    res.render('addPost', { errorMessage: error.message });
    // res.json({ is_error: true, message: error.message });
  }else{
    next();
  }
}

module.exports = userAddPostValidation;