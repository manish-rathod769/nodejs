/* eslint-disable consistent-return */
const { AWS } = require('../utils/aws.configure');
const { errorResponse } = require('../utils/responses');
const { createTable } = require('../utils/createTable');
const { TASK } = require('../constant/tableName.constants');

exports.checkIfProjectTableExists = async (event, context) => {
  try {
    const dynamoDB = new AWS.DynamoDB();
    const params = {
      TableName: TASK,
    };

    await dynamoDB.describeTable(params).promise();
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      createTable(event, context, TASK);
      return context.end();
    }
    context.end();
    return errorResponse(error, 500);
  }
};
