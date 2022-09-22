const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const bookTable = 'books-table';
const orderTable = 'orders-table';

const handler = async (event, context) => {
  try {
    const userId = event.identity.username;
    const orderData = event.arguments?.newOrder.items;

    // Generate dynamic Keys
    const mulKeys = [];
    orderData.forEach((order) => {
      mulKeys.push(
        { bookId: order.bookId }
      );
    });


    // Check if all book ids exist or not
    const params = { RequestItems: {} };
    params.RequestItems[`${bookTable}`] = {
      Keys: mulKeys,
    };

    const result = await dynamoDbClient.batchGet(params).promise();
    if (result.Responses[`${bookTable}`].length !== orderData.length) {
      throw new Error('Some book does not exist in store !!!');
    }

    // Generate new order
    const orderId = uuidv4();
    const orderParams = { RequestItems: {} };
    orderParams.RequestItems[`${orderTable}`] = [];
    orderData.forEach((order) => {
      orderParams.RequestItems[`${orderTable}`].push({
        PutRequest: {
          Item: {
            orderId,
            userId,
            bookId: order.bookId,
            quantity: order.quantity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      });
    });

    // Create order
    const orderResult = await dynamoDbClient.batchWrite(orderParams).promise();
    if (orderResult.UnprocessedItems[`${orderTable}`]) {
      throw new Error('Some error occured while creating order !!!');
    }

    return {
      statusCode: 200,
      body: 'Order placed successfully...',
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
