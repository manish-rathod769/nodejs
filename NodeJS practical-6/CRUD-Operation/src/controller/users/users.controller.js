const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/file.operations');
const { successResponse, errorResponse } = require('../../utils/responses');
const { nonExistProjects } = require('../../utils/check.existance');

const userFilePath = path.join(__dirname, '../../../dataJSON/users.json');

exports.getAllUser = async (req, res) => {
  try {
    const data = await readFile(userFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(req, res, message, 200);
    }

    return successResponse(req, res, data, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await readFile(userFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(req, res, message, 200);
    }

    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));

    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(req, res, message, 200);
    }

    return successResponse(req, res, data[singleUserIndex], 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.addUser = async (req, res) => {
  const {
    fullName, emailID, designation, department, technologiesKnown, projects,
  } = req.body;

  try {
    let data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!fullName || !emailID || !designation || !department || !technologiesKnown || !projects) {
      return errorResponse(req, res, 'All parameter must be defined !!!', 500);
    }

    // Check all project exist or not
    const invalidProject = await nonExistProjects(projects);
    if (invalidProject.length) {
      return errorResponse(req, res, { message: `Projects ${invalidProject} does not exist !!!` }, 412);
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

    return successResponse(req, res, { message: 'Data added successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      const message = { message: 'Empty data...' };
      return successResponse(req, res, message, 200);
    }

    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));

    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(req, res, message, 200);
    }

    // Check if project IDs exist or not
    if (Object.keys(data[singleUserIndex]).includes('projects')) {
      const invalidProject = await nonExistProjects(req.body.projects);
      if (invalidProject.length) {
        return errorResponse(req, res, { message: `Projects ${invalidProject} does not exist !!!` }, 412);
      }
    }

    Object.keys(req.body).forEach((prop) => {
      if (Object.keys(data[singleUserIndex]).includes(prop)) {
        data[singleUserIndex][prop] = req.body[prop];
      }
    });

    await writeFile(userFilePath, data);

    return successResponse(req, res, { message: 'Data updated successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
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
      return successResponse(req, res, message, 200);
    }

    const updatedData = data.filter((user) => user.ID !== Number(userId));

    await writeFile(userFilePath, updatedData);

    return successResponse(req, res, { message: 'Data deleted successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
