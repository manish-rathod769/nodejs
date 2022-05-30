const joi = require('joi');
const { errorResponse } = require('../../utils/responses');

const projectAddObject = joi.object({
  title: joi.string().trim(true).min(5).required(),
  description: joi.string().trim(true).required(),
});

// eslint-disable-next-line consistent-return
exports.projectAddValidation = async (event) => {
  const eventBody = JSON.parse(event.body);
  const payload = {
    title: eventBody.title,
    description: eventBody.description,
  };

  const { error } = projectAddObject.validate(payload);
  if (error) {
    return errorResponse(error.message, 206, error.details);
  }
};
