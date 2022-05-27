const joi = require('joi');
const { errorResponse } = require('../../utils/responses');

const userAddObject = joi.object({
  fullName: joi.string().trim(true).required(),
  emailID: joi.string().trim(true).required(),
  designation: joi.string().trim(true).required(),
  technologiesKnown: joi.array().items(joi.string()).min(1).required(),
  projects: joi.array().items(joi.number()).unique().min(1)
    .required(),
});

exports.userAddValidation = async (req, res, next) => {
  const payload = {
    fullName: req.body.fullName,
    emailID: req.body.emailID,
    designation: req.body.designation,
    technologiesKnown: req.body.technologiesKnown,
    projects: req.body.projects,
  };

  const { error } = userAddObject.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 406, error.details);
  }
  return next();
};
