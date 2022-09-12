const AWS = require('aws-sdk');

const { successResponse } = require('../../helper/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const bookTable = 'books-table';

const handler = async (event) => {
  const { bookId, title, description, imageUrl, author, price } = event.updateBook;

  // Check if book exists or not
  const bookParams = {
    TableName: bookTable,
    Key: {
      bookId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(bookParams).promise();
    if (!Item) {
      throw new Error(`Book does not exist with bookId: '${bookId}' !!!`);
    }
    event.updateBook.createdAt = Item.createdAt;
    event.updateBook.updatedAt = new Date().toISOString();
  } catch (error) {
    throw new Error(error);
  }

  const params = {
    TableName: bookTable,
    Key: {
      bookId,
    },
    UpdateExpression: 'SET #title = :title, #description = :description, #imageUrl = :imageUrl, #author = :author, #price = :price, #updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#title': 'title',
      '#description': 'description',
      '#imageUrl': 'imageUrl',
      '#author': 'author',
      '#price': 'price',
      '#updatedAt': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':title': title,
      ':description': description,
      ':imageUrl': imageUrl || `https://www.amazon.com/dp/B000NZW3KC/${bookId}`,
      ':author': author,
      ':price': price,
      ':updatedAt': new Date().toISOString(),
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    await dynamoDbClient.update(params).promise();
    return successResponse(event.updateBook, 200);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
