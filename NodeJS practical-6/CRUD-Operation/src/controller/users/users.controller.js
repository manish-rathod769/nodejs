const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/readFile.utils');
const { successResponse, errorResponse } = require('../../utils/responses');

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

    if (!fullName || !emailID || !designation || !department || !technologiesKnown || !projects || typeof technologiesKnown !== 'object' || typeof projects !== 'object') {
      return errorResponse(req, res, 'All parameter must be defined or projects or technologiesKnown must be in form of array !!!', 500);
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
