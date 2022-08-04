const joi = require('joi');
const multipart = require('aws-lambda-multipart-parser');
const roles = require('../../constants/roles.constant');
const { errorResponse } = require('../../helper/responses.helper');

// const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const contactPattern = /[6-9]{1}[0-9]{9}/;

const adduserObj = joi.object({
  firstName: joi.string().trim(true).required(),
  lastName: joi.string().trim(true).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().trim(true).min(8).max(20)
    .required(),
  contactNo: joi.string().pattern(contactPattern).trim(true).required(),
  GSTNo: joi.alternatives().conditional('role', { is: roles.SELLER, then: joi.string().trim(true).length(15).required(), otherwise: joi.optional() }),
  avatar: joi.required(),
  role: joi.string().valid(roles.ADMIN, roles.SELLER, roles.USER).required(),
});

exports.addUserValidation = async (event, context) => {
  const eventBody = multipart.parse(event, true);

  const payload = {
    firstName: eventBody.firstName,
    lastName: eventBody.lastName,
    email: eventBody.email,
    password: eventBody.password,
    contactNo: eventBody.contactNo,
    GSTNo: eventBody.GSTNo || '',
    role: eventBody.role,
    avatar: eventBody.avatar,
  };
  const { error } = adduserObj.validate(payload);
  if (error) {
    context.end();
    return errorResponse(error.message, 406);
  }
  return eventBody;
};
