const express = require('express');
const { userAddValidation } = require('../controller/users/users.validator');
const {
  getAllUser, getUser, addUser, updateUser, deleteUser,
} = require('../controller/users/users.controller');

const route = express.Router();

route.get('/', getAllUser);
route.get('/:userId', getUser);
route.post('/', userAddValidation, addUser);
route.put('/:userId', updateUser);
route.delete('/:userId', deleteUser);

module.exports = route;
