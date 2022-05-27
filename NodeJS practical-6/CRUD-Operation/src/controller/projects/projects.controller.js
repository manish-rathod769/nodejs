const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/file.operations');
const { successResponse, errorResponse } = require('../../utils/responses');

const projectFilePath = path.join(__dirname, '../../../dataJSON/projects.json');

exports.getAllProject = async (req, res) => {
  try {
    const data = await readFile(projectFilePath);

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

exports.getProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const data = await readFile(projectFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      const message = { message: 'Empty data...' };
      return successResponse(req, res, message, 200);
    }

    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));

    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(req, res, message, 200);
    }

    return successResponse(req, res, data[singleProjectIndex], 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.addProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    let data = await readFile(projectFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!title || !description) {
      return errorResponse(req, res, 'All parameter must be defined !!!', 500);
    }

    const payload = {
      ID: data[data.length - 1].ID + 1,
      title,
      description,
    };

    data.push(payload);
    await writeFile(projectFilePath, data);

    return successResponse(req, res, { message: 'Data added successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    let data = await readFile(projectFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));

    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(req, res, message, 200);
    }

    Object.keys(req.body).forEach((prop) => {
      if (Object.keys(data[singleProjectIndex]).includes(prop)) {
        data[singleProjectIndex][prop] = req.body[prop];
      }
    });

    await writeFile(projectFilePath, data);

    return successResponse(req, res, { message: 'Data updated successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    let data = await readFile(projectFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));

    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      const message = { message: 'Data does not exist...' };
      return successResponse(req, res, message, 200);
    }

    const updatedData = data.filter((project) => project.ID !== Number(projectId));

    await writeFile(projectFilePath, updatedData);

    return successResponse(req, res, { message: 'Data deleted successfully...' }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
