const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const bookTable = process.env.BOOK_TABLE;
const orderTable = process.env.ORDER_TABLE;

const handler = async (event) => {
  try {
    console.log(event);
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
    
    const orderParams = {
      TableName: `${orderTable}`,
      Item: {
        orderId: uuidv4(),
        userId,
        orderDetails: orderData,
        createdAt: new Date().toISOString()
      }
    }

    const orderDetails = await dynamoDbClient.put(orderParams).promise();

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
