const express = require('express');
const route = express.Router();
const { userRegister, userLogin, userLogout } = require('../controller/users/users.controller');
const { userRegisterValidation, userLoginValidation } = require('../controller/users/users.validation');
const userAccessToken = require('../utils/middleware/user.accessToken.middleware');

route.get('/register', (req, res) => res.render('register', {errorMessage: ""}));
route.get('/login', (req, res) => res.render('login', {errorMessage: ""}));
route.get('/logout', userAccessToken, userLogout);

route.post('/register', userRegisterValidation, userRegister);
route.post('/login', userLoginValidation, userLogin);

module.exports = route;