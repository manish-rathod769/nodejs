const joi = require('joi');
const { errorResponse, successResponse } = require('../../utils/responses');

const taskAddObject = joi.object({
  title: joi.string().trim(true).min(5).required(),
  description: joi.string().trim(true).required(),
  projectID: joi.number().required(),
});

exports.taskAddValidation = async (event, context) => {
  const eventBody = JSON.parse(event.body);
  const payload = {
    title: eventBody.title,
    description: eventBody.description,
    projectID: eventBody.projectID,
  };

  const { error } = taskAddObject.validate(payload);
  if (error) {
    context.end();
    return errorResponse(error.message, 406);
  }
  return successResponse(payload, 200);
};
