const joi = require('joi');
const { errorResponse } = require('../../utils/responses');

const userAddObject = joi.object({
  fullName: joi.string().trim(true).required(),
  emailID: joi.email().trim(true).required(),
  designation: joi.string().trim(true).required(),
  technologiesKnown: joi.array().items(joi.string()).min(1).required(),
  projects: joi.array().items(joi.number()).unique().min(1)
    .required(),
});

// eslint-disable-next-line consistent-return
exports.userAddValidation = async (event) => {
  const eventBody = JSON.parse(event.body);

  const payload = {
    fullName: eventBody.fullName,
    emailID: eventBody.emailID,
    designation: eventBody.designation,
    technologiesKnown: eventBody.technologiesKnown,
    projects: eventBody.projects,
  };

  const { error } = userAddObject.validate(payload);
  if (error) {
    return errorResponse(error.message, 406, error.details);
  }
};
