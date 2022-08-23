require('dotenv').config();
const { AWS } = require('../../config/aws.config');
const { validateInput } = require('./usersValidator');
const { successResponse, errorResponse } = require('../../helper/responses');

const cognito = new AWS.CognitoIdentityServiceProvider();
const { user_pool_id, client_id } = process.env;

exports.registerUser = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const isValid = validateInput(JSON.parse(event.body));
  
  // Check if input is valid or not
  if(!isValid) return errorResponse('Invalid input', 406);
  
  const params = {
    UserPoolId: user_pool_id,
    Username: email,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'email_verified',
        Value: 'true'
      },
    ],
    MessageAction: 'SUPPRESS'
  }
  const response = await cognito.adminCreateUser(params).promise();
  if (response.User) {
    const paramsForSetPass = {
      Password: password,
      UserPoolId: user_pool_id,
      Username: email,
      Permanent: true
    };
    await cognito.adminSetUserPassword(paramsForSetPass).promise()
  }
  return successResponse({ message: 'User created successfully...' }, 200);
}

exports.loginUser = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const isValid = validateInput(JSON.parse(event.body));
  
  if(!isValid) return errorResponse('Invalid input', 406);

  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: user_pool_id,
    ClientId: client_id,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  }
  const response = await cognito.adminInitiateAuth(params).promise();
  return successResponse( { accessToken: response }, 200);
}

exports.protectedRoute = async (event) => {
  return successResponse({ message: 'You are authorized...' }, 200);
}
