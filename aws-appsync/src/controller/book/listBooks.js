const AWS = require('aws-sdk');

const { successResponse } = require('../../helper/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const bookTable = 'books-table';

const handler = async (event) => {
  const { lastEvaluatedKey, limit } = event;
  const params = {
    TableName: bookTable,
    Limit: limit || 5,
  };

  if(lastEvaluatedKey) {
    params.ExclusiveStartKey = { bookId: lastEvaluatedKey };
  }

  try {
    const { Items, LastEvaluatedKey } = await dynamoDbClient.scan(params).promise();
    return successResponse({ books: Items, lastEvaluatedKey: LastEvaluatedKey?.bookId }, 200);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
