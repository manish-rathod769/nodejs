const AWS = require('aws-sdk');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const orderTable = process.env.ORDER_TABLE;

const handler = async (event) => {
  const { lastEvaluatedKey, limit } = event;
  const params = {
    TableName: orderTable,
    Limit: limit || 5,
  };

  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = { orderId: lastEvaluatedKey };
  }

  try {
    const { Items, LastEvaluatedKey } = await dynamoDbClient.scan(params).promise();
    return {
      statusCode: 200,
      body: { orders: Items, lastEvaluatedKey: LastEvaluatedKey?.orderId },
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  handler,
};
