const joi = require('joi');
const { errorResponse } = require('../../utils/responses');

const projectAddObject = joi.object({
  title: joi.string().trim(true).min(5).required(),
  description: joi.string().trim(true).required(),
});

exports.projectAddValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
  };

  const { error } = projectAddObject.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 206, error.details);
  }
  return next();
};
