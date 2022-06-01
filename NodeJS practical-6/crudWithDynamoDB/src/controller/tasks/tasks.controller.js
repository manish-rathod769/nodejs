const { v4: uuidv4 } = require('uuid');
const { AWS } = require('../../utils/aws.configure');
const { TASK } = require('../../constant/tableName.constants');
const { successResponse, errorResponse } = require('../../utils/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

exports.getAllTask = async () => {
  const params = {
    TableName: TASK,
  };

  try {
    const projects = await dynamoDbClient.scan(params).promise();
    return successResponse(projects, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.getOneTask = async (event) => {
  const params = {
    TableName: TASK,
    Key: {
      ID: event.pathParameters.taskId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      return successResponse(Item, 200);
    }
    return successResponse(`Task does not exist with taskId: ${event.pathParameters.taskId}`, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.addTask = async (event) => {
  const eventBody = JSON.parse(event.body);
  const {
    title, description, projectID,
  } = eventBody;

  const params = {
    TableName: TASK,
    Item: {
      ID: uuidv4(),
      title,
      description,
      projectID,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    return successResponse('Task added successfully...', 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.updateTask = async (event) => {
  const eventBody = JSON.parse(event.body);
  const {
    title, description, projectID,
  } = eventBody;

  try {
    const params = {
      TableName: TASK,
      Key: {
        ID: event.pathParameters.taskId,
      },
      ExpressionAttributeValues: {
        ':title': title,
        ':description': description,
        ':projectID': projectID,
      },
      UpdateExpression: 'SET title = :title, description = :description, projectID =:projectID',
      ReturnValues: 'ALL_NEW',
    };

    await dynamoDbClient.update(params).promise();
    return successResponse('Task\'s data updated successfully...', 500);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.deleteTask = async (event) => {
  const params = {
    TableName: TASK,
    Key: {
      ID: event.pathParameters.taskId,
    },
  };

  try {
    await dynamoDbClient.delete(params).promise();
    return successResponse('Task\'s data deleted successfully...', 500);
  } catch (error) {
    return errorResponse(error, 500);
  }
};
