const express = require('express');
const route = express.Router();

const validateAccessToken = require("../middleware/validateAccessToken");
const { adminAddRector, adminAddHostel, adminAddFloor, adminAddRoom } = require('../controller/adminController');
const { adminLogin, adminRectorAddStudent, adminRectorViewStudent, adminRectorSearchStudent, adminRectorCheckHostel, adminRectorViewRoom, adminRectorCheckApproximateAvailableSeats } = require('../controller/adminRectorController');

route.post("/admin/login", adminLogin);

route.post('/admin/rector', validateAccessToken, adminAddRector);
route.post('/admin/hostel', validateAccessToken, adminAddHostel);
route.post('/admin/floor', validateAccessToken, adminAddFloor);
route.post('/admin/room', validateAccessToken, adminAddRoom);
route.post('/admin/student', validateAccessToken, adminRectorAddStudent);
route.get('/admin/students/rooms', validateAccessToken, adminRectorViewStudent);
route.get('/admin/students/:name?', validateAccessToken, adminRectorSearchStudent);
route.get('/admin/hostel/:hostelID?', validateAccessToken, adminRectorCheckHostel);
route.get('/admin/rooms/floor', validateAccessToken, adminRectorViewRoom);
route.get('/admin/seats/:month/:year', validateAccessToken, adminRectorCheckApproximateAvailableSeats);

module.exports = route;