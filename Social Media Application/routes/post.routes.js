const express = require('express');
const route = express.Router();
const { addPost, allPost, profilePost, likePost, editPost, deletePost, renderToAddPost } = require('../controller/posts/posts.controller');
const { upload, isUserEditPostExist, addPostValidation } = require('../controller/posts/posts.validation');
const getUserID = require('../utils/helper/getUserIdFromToken');
const userAccessToken = require('../utils/middleware/user.accessToken.middleware');

route.get('/post', userAccessToken, renderToAddPost);
route.get('/posts/:index', userAccessToken, allPost);
route.get('/posts/:userID/:index', userAccessToken, profilePost);
route.get('/post/:pid', userAccessToken, isUserEditPostExist); //Render to the editPost

route.post('/post', userAccessToken, upload.single('image'), addPostValidation, addPost);
route.put('/posts', userAccessToken, likePost);
route.post('/post/:pid', userAccessToken, addPostValidation, editPost);
// route.post('/edit/:pid', userAccessToken, upload.single('image'), addPostValidation, editPost);

route.delete('/posts', userAccessToken, deletePost);

module.exports = route;