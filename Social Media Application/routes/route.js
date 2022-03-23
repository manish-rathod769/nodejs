const express = require('express');
const indexRoute = require('../controller/user.index.controller');

const userRegister = require('../controller/user.register.controller');
const userRegisterValidation = require('../utils/middleware/user.register.validator');

const userLogin = require('../controller/user.login.controller');
const userLoginValidation = require('../utils/middleware/user.login.validator');

const route = express.Router();

route.get("/", indexRoute);

route.get('/register', (req, res) => res.render('register'));
route.post('/register', userRegisterValidation, userRegister);

// route.get('/login', (req, res) => res.render('login'));
// route.post('/login', userLoginValidation, userLogin);

module.exports = route;