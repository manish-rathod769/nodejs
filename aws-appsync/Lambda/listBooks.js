const AWS = require('aws-sdk');

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
    return {
      statusCode: 200,
      body: { books: Items, lastEvaluatedKey: LastEvaluatedKey?.bookId },
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
