const express = require('express');
const { adminAddRector, adminAddHostel, adminAddFloor, adminAddRoom } = require('../controller/adminController');
const { adminLogin, adminRectorAddStudent, adminRectorViewStudent, adminRectorSearchStudent, adminRectorCheckHostel, adminRectorViewRoom, adminRectorCheckApproximateAvailableSeats } = require('../controller/adminRectorController');
const validateAccessToken = require("../helper/validateAccessToken");
const route = express.Router();

route.post('/admin/rector', validateAccessToken, adminAddRector);
route.post('/admin/hostel', validateAccessToken, adminAddHostel);
route.post('/admin/floor', validateAccessToken, adminAddFloor);
route.post('/admin/room', validateAccessToken, adminAddRoom);

route.post('/admin/student', validateAccessToken, adminRectorAddStudent);
route.get('/admin/student/roomWise', validateAccessToken, adminRectorViewStudent);
route.post("/admin/login", adminLogin);
route.get('/admin/student/:name?/', validateAccessToken, adminRectorSearchStudent);
route.get('/admin/hostel/:hostelCode?', validateAccessToken, adminRectorCheckHostel);
route.get('/admin/room/floorWise', validateAccessToken, adminRectorViewRoom);
route.get('/admin/approximateAvailableSeats/:month/:year', validateAccessToken, adminRectorCheckApproximateAvailableSeats);

module.exports = route;