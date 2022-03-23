const express = require('express');
const indexRoute = require('../controller/user.index.controller');
const userRegister = require('../controller/user.register.controller');
const userRegisterValidation = require('../utils/middleware/user.register.validator');

const route = express.Router();

route.get("/", indexRoute);

route.post('/register', userRegisterValidation, userRegister);

module.exports = route;