const express = require('express');

const route = express.Router();
const { projectAddValidation } = require('../controller/projects/projects.validator');
const {
  addProject, getAllProject, getProject, updateProject, deleteProject,
} = require('../controller/projects/projects.controller');

route.get('/', getAllProject);
route.get('/:projectId', getProject);
route.post('', projectAddValidation, addProject);
route.put('/:projectId', updateProject);
route.delete('/:projectId', deleteProject);

module.exports = route;
