const AWS = require('aws-sdk');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const orderTable = 'orders-table5';
const byUserIndex = 'byUser';

const handler = async (event) => {
  const { lastEvaluatedKey, limit } = event.arguments;
  const userId = event.identity.username;

  const params = {
    TableName: orderTable,
    IndexName: byUserIndex,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.identity.username,
    },
    Limit: limit || 5,
  };

  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = { userId, orderId: lastEvaluatedKey };
  }

  try {
    const { Items, LastEvaluatedKey } = await dynamoDbClient.query(params).promise();
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
