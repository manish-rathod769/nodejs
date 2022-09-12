const AWS = require('aws-sdk');

const { successResponse } = require('../../helper/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const bookTable = 'books-table';

const handler = async (event) => {
  const { bookId } = event;
  const params = {
    TableName: bookTable,
    Key: {
      bookId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (!Item) {
      throw new Error(`Book does not exist with bookId: '${bookId}' !!!`);
    }

    await dynamoDbClient.delete(params).promise();
    return successResponse(`Book with bookId: '${bookId}' deleted successfully...`, 200);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
