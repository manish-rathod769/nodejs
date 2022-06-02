const { v4: uuidv4 } = require('uuid');
const { AWS } = require('../../utils/aws.configure');
const { USER } = require('../../constant/tableName.constants');
const { successResponse, errorResponse } = require('../../utils/responses');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const checkIfUserExist = async (userId) => {
  const params = {
    TableName: USER,
    Key: {
      ID: userId,
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

exports.getAllUser = async () => {
  const params = {
    TableName: USER,
  };

  try {
    const users = await dynamoDbClient.scan(params).promise();
    return successResponse(users, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.getOneUser = async (event) => {
  const params = {
    TableName: USER,
    Key: {
      ID: event.pathParameters.userId,
    },
  };
  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      return successResponse(Item, 200);
    }
    return successResponse({ message: `User does not exist with userId: ${event.pathParameters.userId}` }, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.addUser = async (event) => {
  const eventBody = JSON.parse(event.body);
  const {
    fullName, emailID, designation, department, technologiesKnown, projects,
  } = eventBody;

  const params = {
    TableName: USER,
    Item: {
      ID: uuidv4(),
      fullName,
      emailID,
      designation,
      department,
      technologiesKnown,
      projects,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    return successResponse({ message: 'Data added successfully...' }, 200);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.updateUser = async (event) => {
  const eventBody = JSON.parse(event.body);
  const {
    fullName, emailID, designation, department, technologiesKnown, projects,
  } = eventBody;

  try {
    // Check if user exist or not
    if (!(await checkIfUserExist(event.pathParameters.userId))) {
      return successResponse({ message: `User does not exist with userId: ${event.pathParameters.userId}` }, 200);
    }

    await checkIfUserExist(event.pathParameters.userId);
    const params = {
      TableName: USER,
      Key: {
        ID: event.pathParameters.userId,
      },
      ExpressionAttributeValues: {
        ':fullName': fullName,
        ':emailID': emailID,
        ':designation': designation,
        ':department': department,
        ':technologiesKnown': technologiesKnown,
        ':projects': projects,
      },
      UpdateExpression: 'SET fullName = :fullName, emailID = :emailID, designation = :designation, department = :department, technologiesKnown = :technologiesKnown, projects =:projects',
      ReturnValues: 'ALL_NEW',
    };

    await dynamoDbClient.update(params).promise();
    return successResponse({ message: 'User\'s data updated successfully...' }, 500);
  } catch (error) {
    return errorResponse(error, 500);
  }
};

exports.deleteUser = async (event) => {
  const params = {
    TableName: USER,
    Key: {
      ID: event.pathParameters.userId,
    },
  };

  try {
    // Check if user exist or not
    if (!(await checkIfUserExist(event.pathParameters.userId))) {
      return successResponse({ message: `User does not exist with userId: ${event.pathParameters.userId}` }, 200);
    }

    await dynamoDbClient.delete(params).promise();
    return successResponse({ message: 'User\'s data deleted successfully...' }, 500);
  } catch (error) {
    return errorResponse(error, 500);
  }
};
