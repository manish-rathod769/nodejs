const joi = require('joi');
const { errorResponse } = require('../../utils/responses');

const taskAddObject = joi.object({
  title: joi.string().trim(true).min(5).required(),
  description: joi.string().trim(true).required(),
  projectID: joi.number().required(),
});

exports.taskAddValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    projectID: req.body.projectID,
  };

  const { error } = taskAddObject.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 206, error.details);
  }
  return next();
};
