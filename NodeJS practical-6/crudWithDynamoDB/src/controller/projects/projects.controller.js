const { v4: uuidv4 } = require('uuid');
const { AWS } = require('../../utils/aws.configure');
const { PROJECT } = require('../../constant/tableName.constants');
const { successResponse, errorResponse } = require('../../utils/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const checkIfProjectExist = async (projectId) => {
  const params = {
    TableName: PROJECT,
    Key: {
      ID: projectId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

exports.getAllProject = async () => {
  const params = {
    TableName: PROJECT,
  };

  try {
    const projects = await dynamoDbClient.scan(params).promise();
    return successResponse(projects, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.getOneProject = async (event) => {
  const params = {
    TableName: PROJECT,
    Key: {
      ID: event.pathParameters.projectId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      return successResponse(Item, 200);
    }
    return successResponse({ message: `Project does not exist with projectId: ${event.pathParameters.projectId}` }, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.addProject = async (event) => {
  const eventBody = JSON.parse(event.body);
  const {
    title, description,
  } = eventBody;

  const params = {
    TableName: PROJECT,
    Item: {
      ID: uuidv4(),
      title,
      description,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    return successResponse({ message: 'Project added successfully...' }, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.updateProject = async (event) => {
  const eventBody = JSON.parse(event.body);
  const {
    title, description,
  } = eventBody;

  try {
    // Check if project exist or not
    if (!(await checkIfProjectExist(event.pathParameters.userId))) {
      return successResponse({ message: `Project does not exist with projectId: ${event.pathParameters.projectId}` }, 200);
    }

    const params = {
      TableName: PROJECT,
      Key: {
        ID: event.pathParameters.projectId,
      },
      ExpressionAttributeValues: {
        ':title': title,
        ':description': description,
      },
      UpdateExpression: 'SET title = :title, description = :description',
      ReturnValues: 'ALL_NEW',
    };

    await dynamoDbClient.update(params).promise();
    return successResponse({ message: 'Project\'s data updated successfully...' }, 500);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.deleteProject = async (event) => {
  const params = {
    TableName: PROJECT,
    Key: {
      ID: event.pathParameters.projectId,
    },
  };

  try {
    // Check if project exist or not
    if (!(await checkIfProjectExist(event.pathParameters.userId))) {
      return successResponse({ message: `Project does not exist with projectId: ${event.pathParameters.projectId}` }, 200);
    }

    await dynamoDbClient.delete(params).promise();
    return successResponse({ message: 'Project\'s data deleted successfully...' }, 500);
  } catch (error) {
    return errorResponse(error, 500);
  }
};
