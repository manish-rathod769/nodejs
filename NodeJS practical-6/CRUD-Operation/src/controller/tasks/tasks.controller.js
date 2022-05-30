const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/file.operations');
const { successResponse, errorResponse } = require('../../utils/responses');
const { nonExistProjects } = require('../../utils/check.existance');

const taskFilePath = path.join(__dirname, '../../../dataJSON/tasks.json');

exports.getAllTask = async () => {
  try {
    const data = await readFile(taskFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(message, 200);
    }

    return successResponse(data, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.getTask = async (event) => {
  const { taskId } = event.pathParameters;
  try {
    const data = await readFile(taskFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(message, 200);
    }

    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));
    // Check if project with ID exist or not
    if (singleTaskIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(message, 200);
    }

    return successResponse(data[singleTaskIndex], 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.addTask = async (event) => {
  const { title, description, projectID } = JSON.parse(event.body);

  try {
    let data = await readFile(taskFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!title || !description || !projectID) {
      return errorResponse('All parameter must be defined !!!', 500);
    }

    // Check all project exist or not
    const invalidProject = await nonExistProjects(Array(1).fill(projectID));
    if (invalidProject.length) {
      return errorResponse({ message: `Projects ${invalidProject} does not exist !!!` }, 412);
    }

    const payload = {
      ID: data[data.length - 1].ID + 1,
      title,
      description,
      projectID,
    };

    data.push(payload);
    await writeFile(taskFilePath, data);

    return successResponse({ message: 'Data added successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.updateTask = async (event) => {
  const { taskId } = event.pathParameters;
  const eventBody = JSON.parse(event.body);
  try {
    let data = await readFile(taskFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));

    // Check if project with ID exist or not
    if (singleTaskIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(message, 200);
    }

    // Check if project IDs exist or not
    if (Object.keys(data[singleTaskIndex]).includes('projectID')) {
      const invalidProject = await nonExistProjects(Array(1).fill(eventBody.projectID));
      if (invalidProject.length) {
        return errorResponse({ message: `Projects ${invalidProject} does not exist !!!` }, 412);
      }
    }

    Object.keys(eventBody).forEach((prop) => {
      if (Object.keys(data[singleTaskIndex]).includes(prop)) {
        data[singleTaskIndex][prop] = eventBody[prop];
      }
    });

    await writeFile(taskFilePath, data);

    return successResponse({ message: 'Data updated successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.deleteTask = async (event) => {
  const { taskId } = event.pathParameters;
  try {
    let data = await readFile(taskFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));

    // Check if project with ID exist or not
    if (singleTaskIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(message, 200);
    }

    const updatedData = data.filter((project) => project.ID !== Number(taskId));

    await writeFile(taskFilePath, updatedData);

    return successResponse({ message: 'Data deleted successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};
