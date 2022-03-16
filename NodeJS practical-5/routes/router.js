const express = require('express');
const { hash, compare } = require('bcryptjs');
const { adminAddRectorController, adminAddHostelController, adminAddFloorController, adminAddRoomController } = require('../controller/adminController');
const { adminLoginController, rectorLoginController, adminRectorAddStudentController, adminRectorViewStudentController, adminRectorSearchStudentController, adminRectorCheckHostelController, adminRectorViewRoomController, adminRectorCheckApproximateAvailableSeats } = require('../controller/adminRectorController');
const validateAccessToken = require("../helper/validateAccessToken");
const route = express.Router();

route.post('/admin/add/rector', validateAccessToken, adminAddRectorController);
route.post('/admin/add/hostel', validateAccessToken, adminAddHostelController);
route.post('/admin/add/floor', validateAccessToken, adminAddFloorController);
route.post('/admin/add/room', validateAccessToken, adminAddRoomController);

route.post('/admin/add/student', validateAccessToken, adminRectorAddStudentController);
route.post('/rector/add/student', validateAccessToken, adminRectorAddStudentController);

route.post("/admin/login", adminLoginController);
route.post("/rector/login", rectorLoginController);

route.post("rector/login", )

module.exports = route;