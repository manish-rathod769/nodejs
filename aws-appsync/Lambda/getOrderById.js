const AWS = require('aws-sdk');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const orderTable = process.env.ORDER_TABLE;

const handler = async (event) => {
  const { orderId } = event;
  const params = {
    TableName: orderTable,
    Key: {
      orderId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (!Item) {
      throw new Error(`Order does not exist with orderId: '${orderId}' !!!`);
    }
    return {
      statusCode: 200,
      body: Item,
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
