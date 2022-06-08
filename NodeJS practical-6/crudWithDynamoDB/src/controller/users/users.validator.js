const joi = require('joi');
const { errorResponse, successResponse } = require('../../utils/responses');

const userAddObject = joi.object({
  fullName: joi.string().trim(true).required(),
  emailID: joi.string().email().required(),
  designation: joi.string().trim(true).required(),
  department: joi.string().trim(true).required(),
  technologiesKnown: joi.array().items(joi.string()).min(1).required(),
  projects: joi.array().items(joi.string()).unique().min(1)
    .required(),
});

// eslint-disable-next-line consistent-return
exports.userValidation = async (event, context) => {
  const eventBody = JSON.parse(event.body);

  const payload = {
    fullName: eventBody.fullName,
    emailID: eventBody.emailID,
    designation: eventBody.designation,
    department: eventBody.department,
    technologiesKnown: eventBody.technologiesKnown,
    projects: eventBody.projects,
  };

  const { error } = userAddObject.validate(payload);
  if (error) {
    context.end();
    return errorResponse(error.message, 406, error.details);
  }
  return successResponse(payload, 200);
};
