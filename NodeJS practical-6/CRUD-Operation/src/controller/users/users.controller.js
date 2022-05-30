const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/file.operations');
const { successResponse, errorResponse } = require('../../utils/responses');
const { nonExistProjects } = require('../../utils/check.existance');

const userFilePath = path.join(__dirname, '../../../dataJSON/users.json');

exports.getAllUser = async () => {
  try {
    const data = await readFile(userFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      return successResponse({ message: 'Empty data...' }, 200);
    }

    return successResponse(data, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.getUser = async (event) => {
  const { userId } = event.pathParameters;

  try {
    const data = await readFile(userFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      return successResponse({ message: 'Empty data...' }, 200);
    }

    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));

    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      return successResponse({ message: 'Data does not exist...' }, 200);
    }

    return successResponse(data[singleUserIndex], 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.addUser = async (event) => {
  const {
    fullName, emailID, designation, department, technologiesKnown, projects,
  } = JSON.parse(event.body);

  try {
    let data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!fullName || !emailID || !designation || !department || !technologiesKnown || !projects) {
      return errorResponse('All parameter must be defined !!!', 500);
    }

    // Check all project exist or not
    const invalidProject = await nonExistProjects(projects);
    if (invalidProject.length) {
      return errorResponse({ message: `Projects ${invalidProject} does not exist !!!` }, 412);
    }

    const payload = {
      ID: data[data.length - 1].ID + 1,
      fullName,
      emailID,
      designation,
      department,
      technologiesKnown,
      projects,
    };

    data.push(payload);
    await writeFile(userFilePath, data);

    return successResponse({ message: 'Data added successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.updateUser = async (event) => {
  const { userId } = event.pathParameters;
  const eventBody = JSON.parse(event.body);

  try {
    const data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      return successResponse({ message: 'Empty data...' }, 200);
    }

    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));

    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      return successResponse({ message: 'Data does not exist...' }, 200);
    }

    // Check if project IDs exist or not
    if (Object.keys(data[singleUserIndex]).includes('projects')) {
      const invalidProject = await nonExistProjects(eventBody.projects);

      if (invalidProject.length) {
        return errorResponse({ message: `Projects ${invalidProject} does not exist !!!` }, 412);
      }
    }
    Object.keys(eventBody).forEach((prop) => {
      if (Object.keys(data[singleUserIndex]).includes(prop)) {
        data[singleUserIndex][prop] = eventBody[prop];
      }
    });

    await writeFile(userFilePath, data);

    return successResponse({ message: 'Data updated successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};

exports.deleteUser = async (event) => {
  const { userId } = event.pathParameters;
  try {
    let data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));

    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(message, 200);
    }

    const updatedData = data.filter((user) => user.ID !== Number(userId));

    await writeFile(userFilePath, updatedData);

    return successResponse({ message: 'Data deleted successfully...' }, 200);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
};
