const AWS = require('aws-sdk');

const handler = async (event) => {
  try {
    return {
      statusCode: 200,
      body: event,
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
