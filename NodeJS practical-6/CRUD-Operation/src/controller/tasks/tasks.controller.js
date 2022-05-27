const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/file.operations');
const { successResponse, errorResponse } = require('../../utils/responses');

const taskFilePath = path.join(__dirname, '../../../dataJSON/tasks.json');

exports.getAllTask = async (req, res) => {
  try {
    const data = await readFile(taskFilePath);

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

exports.getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const data = await readFile(taskFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(req, res, message, 200);
    }

    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));

    // Check if project with ID exist or not
    if (singleTaskIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(req, res, message, 200);
    }

    return successResponse(req, res, data[singleTaskIndex], 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.addTask = async (req, res) => {
  const { title, description, projectID } = req.body;

  try {
    let data = await readFile(taskFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!title || !description || !projectID) {
      return errorResponse(req, res, 'All parameter must be defined !!!', 500);
    }

    const payload = {
      ID: data[data.length - 1].ID + 1,
      title,
      description,
      projectID,
    };

    data.push(payload);
    await writeFile(taskFilePath, data);

    return successResponse(req, res, { message: 'Data added successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
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
      return successResponse(req, res, message, 200);
    }

    Object.keys(req.body).forEach((prop) => {
      if (Object.keys(data[singleTaskIndex]).includes(prop)) {
        data[singleTaskIndex][prop] = req.body[prop];
      }
    });

    await writeFile(taskFilePath, data);

    return successResponse(req, res, { message: 'Data updated successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
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
      return successResponse(req, res, message, 200);
    }

    const updatedData = data.filter((project) => project.ID !== Number(taskId));

    await writeFile(taskFilePath, updatedData);

    return successResponse(req, res, { message: 'Data deleted successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
