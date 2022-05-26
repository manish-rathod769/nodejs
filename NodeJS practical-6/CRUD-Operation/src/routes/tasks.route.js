const express = require('express');
const { taskAddValidation } = require('../controller/tasks/tasks.validator');
const {
  addTask, getAllTask, getTask, updateTask, deleteTask,
} = require('../controller/tasks/tasks.controller');

const route = express.Router();

route.get('/', getAllTask);
route.get('/:taskId', getTask);
route.post('/', taskAddValidation, addTask);
route.put('/:taskId', updateTask);
route.delete('/:taskId', deleteTask);

module.exports = route;
