const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/file.operations');
const { successResponse, errorResponse } = require('../../utils/responses');

const projectFilePath = path.join(__dirname, '../../../dataJSON/projects.json');

exports.getAllProject = async () => {
  try {
    const data = await readFile(projectFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(message, 204);
    }

    return successResponse(data, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.getProject = async (event) => {
  const { projectId } = event.pathParameters;
  try {
    const data = await readFile(projectFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(message, 204);
    }

    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));

    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      const message = { message: 'Projects does not exist...' };
      return successResponse(message, 204);
    }

    return successResponse(data[singleProjectIndex], 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.addProject = async (event) => {
  const { title, description } = JSON.parse(event.body);

  try {
    let data = await readFile(projectFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!title || !description) {
      return errorResponse('All parameter must be defined !!!', 500);
    }

    const payload = {
      ID: data[data.length - 1].ID + 1,
      title,
      description,
    };

    data.push(payload);
    await writeFile(projectFilePath, data);

    return successResponse({ message: 'Projects added successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.updateProject = async (event) => {
  const { projectId } = event.pathParameters;
  try {
    const eventBody = JSON.parse(event.body);
    let data = await readFile(projectFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));

    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      const message = { message: 'Projects does not exist...' };
      return successResponse(message, 204);
    }

    Object.keys(eventBody).forEach((prop) => {
      if (Object.keys(data[singleProjectIndex]).includes(prop)) {
        data[singleProjectIndex][prop] = eventBody[prop];
      }
    });

    await writeFile(projectFilePath, data);

    return successResponse({ message: 'Projects updated successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.deleteProject = async (event) => {
  const { projectId } = event.pathParameters;
  try {
    let data = await readFile(projectFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));

    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      const message = { message: 'Projects does not exist...' };
      return successResponse(message, 204);
    }

    const updatedData = data.filter((project) => project.ID !== Number(projectId));

    await writeFile(projectFilePath, updatedData);

    return successResponse({ message: 'Projects deleted successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};
