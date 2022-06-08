const difference = require('lodash.difference');
const { PROJECT } = require('../constant/tableName.constants');
const { AWS } = require('./aws.configure');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const readProjectData = async () => {
  const params = {
    TableName: PROJECT,
  };

  try {
    const projects = await dynamoDbClient.scan(params).promise();
    return projects;
  } catch (error) {
    return [];
  }
};

exports.nonExistProjects = async (projectArr = []) => {
  const projectDetails = await readProjectData();
  const projectIDs = projectDetails.Items.map((ele) => ele.ID);
  return difference(projectArr, projectIDs);
};
