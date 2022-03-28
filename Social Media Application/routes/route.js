const express = require('express');
const indexRoute = require('../controller/user.index.controller');

const userRegister = require('../controller/user.register.controller');
const userLogin = require('../controller/user.login.controller');
const userAllPost = require('../controller/user.allPost.controller');
const userProfilePost = require('../controller/user.profilePost.controller');
const userAddPost = require('../controller/user.addPost.controller');
const userLogout = require('../controller/user.logout.controller');
const userPostLike = require('../controller/user.likePost.controller');
const userDeletePost = require('../controller/user.deletePost.controller');
const userEditPost = require('../controller/user.editPost.controller');

const userRegisterValidation = require('../utils/middleware/user.register.validator');
const userLoginValidation = require('../utils/middleware/user.login.validator');
const userAccessTokenValidation = require('../utils/middleware/user.accessToken.validator');
const userAddPostValidation = require('../utils/middleware/user.addPost.validator');
const userEditPostValidation = require('../utils/middleware/user.editPost.validator');

const userEditPostMiddleware = require('../utils/middleware/user.editPost.middlware');  

const upload = require('../utils/middleware/user.upload.image');

const route = express.Router();

route.get("/", indexRoute);

route.get('/register', (req, res) => res.render('register', {errorMessage: ""}));
route.get('/login', (req, res) => res.render('login', {errorMessage: ""}));
route.get('/add', userAccessTokenValidation, (req, res) => res.render('addPost', {errorMessage: ""}));
route.get('/all/:index?', userAccessTokenValidation, userAllPost);
route.get('/profile/:index?', userAccessTokenValidation, userProfilePost);
route.get('/logout', userAccessTokenValidation, userLogout);
route.get('/edit/:pid', userAccessTokenValidation, userEditPostMiddleware);

route.post('/register', userRegisterValidation, userRegister);
route.post('/login', userLoginValidation, userLogin);
route.post('/add', upload.single('image'), userAddPostValidation, userAddPost);
route.post('/like', userAccessTokenValidation, userPostLike);
route.post('/edit/:pid', userAccessTokenValidation, userEditPost);

route.delete('/delete', userAccessTokenValidation, userEditPostValidation, userDeletePost);

module.exports = route;