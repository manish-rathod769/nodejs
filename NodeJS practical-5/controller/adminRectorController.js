const { studentModel, roomModel, adminModel, rectorModel, floorModel, hostelModel } = require("../model/models");
const loginUtil = require('../util/loginUtil');
const { verify } = require('jsonwebtoken');
const { hash } = require('bcrypt');
const insertDocUtil = require("../util/insertDocUtil");

let adminLoginController = async (req, res) => {
  loginUtil(req, res, adminModel);
}

let rectorLoginController = async (req, res) => {
  loginUtil(req, res, rectorModel);
}

let adminRectorAddStudentController = async (req, res) => {
  try{
    let studentDetails = "";
    await req.on('data', chunk => {
      studentDetails += chunk;
    })
    // const encryptedPassword = await hash(studentDetails.password, 10);
    studentDetails = JSON.parse(studentDetails);
    studentDetails.password = await hash(studentDetails.password, 10);
    studentDetailsToBeAdded = new studentModel(studentDetails);
    const { firstName, lastName, email, password, allocatedRoomCode, courseDetails } = studentDetails;
    const { courseName, courseAdmissionMonth, courseAdmissionYear, coursePassoutMonth, coursePassoutYear } = courseDetails;
  
    if(!firstName || !lastName || !email || !password || !allocatedRoomCode || !courseDetails.courseName || !courseDetails.courseAdmissionMonth || !courseDetails.courseAdmissionYear || !courseDetails.coursePassoutMonth || !courseDetails.coursePassoutYear) throw new Error("All Details of the student must be provide!!!");
    // Check if seat available in specific room or not
    let roomFlag = [];
    await roomModel.find()
    .then( rooms => {
      roomFlag = rooms.filter(room => room.roomCode === (allocatedRoomCode));
    });
    roomFlag = roomFlag[0];
    if(!roomFlag) throw new Error("Room code does not exist in database!!!");

    // Check if room any seat available in room or not
    let allocatedStudentInRoom = await studentModel.aggregate([{$match: {allocatedRoomCode: allocatedRoomCode}}, {$count: "Count"}]);
    if(allocatedStudentInRoom.length == 0){
      insertDocUtil(req, res, studentDetailsToBeAdded, "Student Details Added Successfully...");
    }else{
      if(allocatedStudentInRoom[0].Count >= roomFlag.roomCapacity) throw new Error(`No seats available in roomCode ${allocatedRoomCode}!!!`);
      insertDocUtil(req, res, studentDetailsToBeAdded, "Student Details Added Successfully...");
    }
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminRectorViewStudentController = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;
    let studentRoomWise = await studentModel.aggregate([{$group: {_id : "$allocatedRoomCode", students: {$push: {firstName: "$firstName", lastName: "$lastName", email: "$email"}}}}, {$sort:{_id: 1}}, {$skip: (pageIndex-1)*2}, {$limit: 2}]);
    if(studentRoomWise.length == 0) throw new Error("No more data Found!!!");
    res.status(200).json({ data: studentRoomWise });
    res.end()
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminRectorSearchStudentController = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;
    let matchedDocs = "";
    console.log(req.params.name)
    if(req.params.name) matchedDocs = await studentModel.find({$text: {$search: req.params.name}}, {__v: 0}).skip((pageIndex-1)*2).limit(2);
    if(!req.params.name) matchedDocs = await studentModel.find();
    if(matchedDocs.length == 0) throw new Error("Not Found!!!");
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data: matchedDocs });
    res.end()
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

module.exports = {
  adminLoginController,
  rectorLoginController,
  adminRectorAddStudentController,
  adminRectorViewStudentController,
  adminRectorSearchStudentController,
}