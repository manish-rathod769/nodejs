const express = require('express');
const { rectorLogin, adminRectorAddStudent, adminRectorViewStudent, adminRectorSearchStudent, adminRectorCheckHostel, adminRectorViewRoom, adminRectorCheckApproximateAvailableSeats } = require('../controller/adminRectorController');
const validateAccessToken = require("../helper/validateAccessToken");
const route = express.Router();

route.post('/rector/student', validateAccessToken, adminRectorAddStudent);
route.get('/rector/student/roomWise', validateAccessToken, adminRectorViewStudent);
route.post("/rector/login", rectorLogin);
route.get('/rector/student/:name?/', validateAccessToken, adminRectorSearchStudent);
route.get('/rector/hostel/:hostelCode?', validateAccessToken, adminRectorCheckHostel);
route.get('/rector/room/floorWise', validateAccessToken, adminRectorViewRoom);
route.get('/rector/approximateAvailableSeats/:month/:year', validateAccessToken, adminRectorCheckApproximateAvailableSeats);

module.exports = route;