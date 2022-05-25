const path = require('path');
const { readFile } = require('../utils/readFile.utils');
const { displayOP } = require('../utils/displayOP.utils');

const projectFilePath = path.join(__dirname, '../../dataJSON/projects.json');
const userFilePath = path.join(__dirname, '../../dataJSON/users.json');
const taskFilePath = path.join(__dirname, '../../dataJSON/tasks.json');

exports.fetchData = async () => {
  try {
    // Read JSON data one after another
    const usersData = await readFile(userFilePath);
    const projectsData = await readFile(projectFilePath);
    const tasksData = await readFile(taskFilePath);
    return displayOP(usersData, projectsData, tasksData);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
};
