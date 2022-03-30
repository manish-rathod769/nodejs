const express = require('express');
const { rectorLogin, adminRectorAddStudent, adminRectorViewStudent, adminRectorSearchStudent, adminRectorCheckHostel, adminRectorViewRoom, adminRectorCheckApproximateAvailableSeats } = require('../controller/adminRectorController');
const validateAccessToken = require("../middleware/validateAccessToken");
const route = express.Router();

route.post("/rector/login", rectorLogin);
route.post('/rector/student', validateAccessToken, adminRectorAddStudent);
route.get('/rector/students/rooms', validateAccessToken, adminRectorViewStudent);
route.get('/rector/students/:name?', validateAccessToken, adminRectorSearchStudent);
route.get('/rector/hostel/:hostelID?', validateAccessToken, adminRectorCheckHostel);
route.get('/rector/rooms/floor', validateAccessToken, adminRectorViewRoom);
route.get('/rector/seats/:month/:year', validateAccessToken, adminRectorCheckApproximateAvailableSeats);

module.exports = route;