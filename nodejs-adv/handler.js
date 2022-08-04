// 'use strict';
// const serverless = require('serverless-http');

module.exports.hello = async (event) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'Go Serverless v3.0! Your function executed successfully! manishrathod',
      input: event,
    },
    null,
    2,
  ),
});
