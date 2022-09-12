const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { successResponse } = require('../../helper/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const bookTable = 'books-table';

const handler = async (event) => {
  const { title, description, imageUrl, author, price } = event.newBook;
  const bookId = uuidv4();
  const params = {
    TableName: bookTable,
    Item: {
      bookId,
      title,
      description,
      imageUrl: imageUrl || `https://www.amazon.com/dp/B000NZW3KC/${bookId}`,
      author,
      price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  try {
    const savedBook = await dynamoDbClient.put(params).promise();
    return successResponse(params.Item, 200);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
