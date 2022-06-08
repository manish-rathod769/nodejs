const { AWS } = require('./aws.configure');
const { errorResponse } = require('./responses');

// eslint-disable-next-line consistent-return
exports.createTable = async (event, context, tableName) => {
  try {
    const dynamoDB = new AWS.DynamoDB();

    const params = {
      TableName: tableName,
      KeySchema: [
        // Creating a PARTITION KEY
        { AttributeName: 'ID', KeyType: 'HASH' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'ID', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    };

    await dynamoDB.createTable(params).promise();
  } catch (error) {
    context.end();
    return errorResponse(error, 500);
  }
};
