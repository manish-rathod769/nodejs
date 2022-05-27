const path = require('path');
const difference = require('lodash.difference');
const { readFile } = require('./file.operations');

const projectFilePath = path.join(__dirname, '../../dataJSON/projects.json');

exports.nonExistProjects = async (projectArr) => {
  const projectData = await readFile(projectFilePath);
  const projectIDs = projectData.map((ele) => ele.ID);
  return difference(projectArr, projectIDs);
};
