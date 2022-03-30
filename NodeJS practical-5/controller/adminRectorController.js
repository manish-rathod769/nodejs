const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { adminModel, rectorModel } = require('../model/admin/admin.rector.model');
const hostelModel = require('../model/admin/hostel.model');
const floorModel = require('../model/admin/floor.model');
const roomModel = require('../model/admin/room.model');
const studentModel = require('../model/student.model');

const login = require('../helper/login');
const { hash } = require('bcrypt');
const insertDocUtil = require("../helper/insertDocUtil");

let adminLogin = async (req, res) => {
  login(req, res, adminModel);
}

let rectorLogin = async (req, res) => {
  login(req, res, rectorModel);
}

let adminRectorAddStudent = (req, res) => {
  try{
    let studentDetails = "";
    req.on('data', chunk => {
      studentDetails += chunk;
    })
    req.on('end', async () => {
      try{
        studentDetails = JSON.parse(studentDetails);

        studentDetails.password = await hash(studentDetails.password, 10);
        studentDetailsToBeAdded = new studentModel(studentDetails);
        const { firstName, lastName, email, password, allocatedRoomCode, courseDetails } = studentDetails;
        // const { courseName, courseAdmissionMonth, courseAdmissionYear, coursePassoutMonth, coursePassoutYear } = courseDetails;
  
        if(!firstName || !lastName || !email || !password || !allocatedRoomCode || !courseDetails.courseName || !courseDetails.courseAdmissionMonth || !courseDetails.courseAdmissionYear || !courseDetails.coursePassoutMonth || !courseDetails.coursePassoutYear) throw new Error("All Details of the student must be provide!!!");
        // Check if seat available in specific room or not
        const matchedRoom = await roomModel.find({roomCode: allocatedRoomCode});
        if(!matchedRoom.length) throw new Error("RoomCode does not exist in the database!!!");

        // Chech if seat available in room or not
        const allocatedStudentsInRoom = await studentModel.find({allocatedRoomCode}).count();
        if(!allocatedStudentsInRoom){
          insertDocUtil(req, res, studentDetailsToBeAdded, "Student Details Added Successfully...");
        }else{
          if(allocatedStudentsInRoom >= matchedRoom[0].roomCapacity) throw new Error(`No seats available in roomCode ${allocatedRoomCode}!!!`)
          insertDocUtil(req, res, studentDetailsToBeAdded, "Student Details Added Successfully...");
        }
      }catch(e){
        res.status(404).json({ error: e.message });
      }
    })
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

let adminRectorViewStudent = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;
    let studentRoomWise = await studentModel.aggregate([{$group: {_id : "$allocatedRoomCode", students: {$push: {firstName: "$firstName", lastName: "$lastName", email: "$email"}}}}, {$sort:{_id: 1}}, {$skip: (pageIndex-1)*2}, {$limit: 2}]);
    if(studentRoomWise.length == 0) throw new Error("No more data Found!!!");
    res.status(200).json({ data: studentRoomWise });
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

let adminRectorSearchStudent = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;
    let matchedDocs = "";
    console.log(req.params.name)
    if(req.params.name) matchedDocs = await studentModel.find({$text: {$search: req.params.name}}, {__v: 0}).skip((pageIndex-1)*2).limit(2);
    if(!req.params.name) matchedDocs = await studentModel.find();
    if(matchedDocs.length == 0) throw new Error("Not Found!!!");
    res.status(200).json({ data: matchedDocs });
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

let adminRectorCheckHostel = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;
    
    let hostelCapacityAndAvailableSeats = "";
    if(req.params.hostelID){
      let hostelID = ObjectId(req.params.hostelID);
      const matchedHostel = hostelModel.find({_id: hostelID});
      if(!(await matchedHostel).length) throw new Error("HosteID does not exist!!!");

      // If HostelCode is defines then check capacity of their particular 
      hostelCapacityAndAvailableSeats = await hostelModel.aggregate([{$match: {_id: hostelID}}, {$lookup: {from: "floors", localField: "_id", foreignField: "hostelID", as:"floorDetails"}}, {$lookup: {from: "rooms", localField: "floorDetails._id", foreignField: "floorID", as:"roomDetails"}}, {$lookup: {from: "students", localField: "roomDetails.roomCode", foreignField: "allocatedRoomCode", as: "studentsAllocatedRoomDetails"}}, {$project: { _id: 0, hostelCode: "$hostelCode", totalSeat: {$sum: "$roomDetails.roomCapacity"}, availableSeat:{$subtract : [{$sum: "$roomDetails.roomCapacity"}, {$size: "$studentsAllocatedRoomDetails"}]}}}, {$skip: (pageIndex-1)*2}, {$limit: 2}]);
    }else{
      hostelCapacityAndAvailableSeats = await hostelModel.aggregate([{$lookup: {from: "floors", localField: "_id", foreignField: "hostelID", as:"floorDetails"}}, {$lookup: {from: "rooms", localField: "floorDetails._id", foreignField: "floorID", as:"roomDetails"}}, {$lookup: {from: "students", localField: "roomDetails.roomCode", foreignField: "allocatedRoomCode", as: "studentsAllocatedRoomDetails"}}, {$project: { _id: 0, hostelCode: "$hostelCode", totalSeat: {$sum: "$roomDetails.roomCapacity"}, availableSeat:{$subtract : [{$sum: "$roomDetails.roomCapacity"}, {$size: "$studentsAllocatedRoomDetails"}]}}}, {$skip: (pageIndex-1)*2}, {$limit: 2}]);
    }
    if(hostelCapacityAndAvailableSeats.length == 0) throw new Error("No more data found!!!");
    res.status(200).json({data: hostelCapacityAndAvailableSeats});
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminRectorViewRoom = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;

    let docs = await floorModel.aggregate([{$lookup: {from: "rooms", localField: "_id", foreignField: "floorID", as: "roomDetails"}}, {$project: {_id: 0, __v: 0, "roomDetails._id": 0, "roomDetails.floorID": 0, "roomDetails.__v": 0}}, {$skip: (pageIndex-1)*2}, {$limit: 2}])
    if(docs.length == 0) throw new Error("No more data found!!!");
    res.json({data: docs})
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

let adminRectorCheckApproximateAvailableSeats = async (req, res) => {
  try{
    let { month, year } = req.params;
    let [monthInt, yearInt] = [Number(month), Number(year)];
    if(!month || !year) throw new Error("Please enter valid month and year!!!");

    let queryForAvailableSeats = await hostelModel.aggregate([{$lookup: {from: "floors", localField: "_id", foreignField: "hostelID", as:"floorDetails"}}, {$lookup: {from: "rooms", localField: "floorDetails._id", foreignField: "floorID", as:"roomDetails"}}, {$lookup: {from: "students", localField: "roomDetails.roomCode", foreignField: "allocatedRoomCode", as: "studentsAllocatedRoomDetails"}}, {$project: { _id: 0, hostelCode: "$hostelCode", totalSeat: {$sum: "$roomDetails.roomCapacity"}, availableSeat:{$subtract : [{$sum: "$roomDetails.roomCapacity"}, {$size: "$studentsAllocatedRoomDetails"}]}}}]);
    let totalAvailableSeats = 0;
    queryForAvailableSeats.forEach( obj => {
      totalAvailableSeats+=Number(obj.availableSeat);
    })
    let queryApproximateAvailabilitySeat = await studentModel.aggregate([{$match: {$and: [{"courseDetails.coursePassoutYear": {$lte: yearInt}}, {"courseDetails.coursePassoutMonth": {$lte: monthInt}}]}}]);
    let approximateAvailableSeats = 0;
    approximateAvailableSeats = (queryApproximateAvailabilitySeat.length) ? totalAvailableSeats + queryApproximateAvailabilitySeat.length : totalAvailableSeats;
    res.status(200).json({ approximateAvailableSeats});
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

module.exports = {
  adminLogin,
  rectorLogin,
  adminRectorAddStudent,
  adminRectorViewStudent,
  adminRectorSearchStudent,
  adminRectorCheckHostel,
  adminRectorViewRoom,
  adminRectorCheckApproximateAvailableSeats
}

// db.students.aggregate([{$match: {$or: [{$and: [{"courseDetails.coursePassoutYear": {$lte: 2021}}, {"courseDetails.coursePassoutMonth": {$lte: 8}}]}, {$and: [{"courseDetails.courseAdmissionYear": {$eq: 2021}}, {"courseDetails.courseAdmissionMonth": {$eq: 8}}]}]}}])