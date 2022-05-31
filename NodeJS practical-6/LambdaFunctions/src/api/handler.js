const path = require('path');
const { readFile } = require('../utils/readFile.utils');
const { displayOP } = require('../utils/displayOP.utils');

const projectFilePath = path.join(__dirname, '../../dataJSON/projects.json');
const userFilePath = path.join(__dirname, '../../dataJSON/users.json');
const taskFilePath = path.join(__dirname, '../../dataJSON/tasks.json');

exports.fetchData = async () => {
  Promise.all([readFile(userFilePath), readFile(projectFilePath), readFile(taskFilePath)])
    .then((data) => displayOP(data[0], data[1], data[2]))
    .catch((error) => ({
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    }));
};
