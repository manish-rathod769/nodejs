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

let adminRectorAddStudentController = (req, res) => {
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
        const { courseName, courseAdmissionMonth, courseAdmissionYear, coursePassoutMonth, coursePassoutYear } = courseDetails;
  
        if(!firstName || !lastName || !email || !password || !allocatedRoomCode || !courseDetails.courseName || !courseDetails.courseAdmissionMonth || !courseDetails.courseAdmissionYear || !courseDetails.coursePassoutMonth || !courseDetails.coursePassoutYear) throw new Error("All Details of the student must be provide!!!");
        // Check if seat available in specific room or not
        let roomFlag = [];
        await roomModel.find()
        .then( rooms => {
          roomFlag = rooms.filter(room => room.roomCode === Number(allocatedRoomCode));
        });
        roomFlag = roomFlag[0];
        if(!roomFlag) throw new Error("Room code does not exist in database!!!");

        // Check if room any seat available in room or not
        let allocatedStudentInRoom = await studentModel.aggregate([{$match: {allocatedRoomCode: allocatedRoomCode}}, {$count: "Count"}]);
        if(allocatedStudentInRoom.length == 0){
          insertDocUtil(req, res, studentDetailsToBeAdded, "Student Details Added Successfully...");
        }else{
          if(allocatedStudentInRoom[0].Count >= roomFlag.roomCapacity) throw new Error(`No seats available in roomCode ${allocatedRoomCode}!!!`);
          // insertDocUtil(req, res, studentDetailsToBeAdded, "Student Details Added Successfully...");
          console.log("Student Details Added Successfully")
        }
      }catch(e){
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ error: e.message });
        res.end();    
      }
    })
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

let adminRectorCheckHostelController = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;
    console.log(pageIndex);
    let hostelCapacityAndAvailableSeats = "";
    if(req.params.hostelCode){
      await hostelModel.find()
      .then( hostels => {
        let flag = hostels.some(hostel => hostel.hostelCode === Number(req.params.hostelCode));
        if(!flag) throw new Error("Hostel code doen not exist!!!");
      })
      // If HostelCode is defines then check capacity of their particular 
      hostelCapacityAndAvailableSeats = await hostelModel.aggregate([{$match: {hostelCode: Number(req.params.hostelCode)}}, {$lookup: {from: "floors", localField: "hostelCode", foreignField: "hostelCode", as:"floorDetails"}}, {$lookup: {from: "rooms", localField: "floorDetails.floorCode", foreignField: "floorCode", as:"roomDetails"}}, {$lookup: {from: "students", localField: "roomDetails.roomCode", foreignField: "allocatedRoomCode", as: "studentsAllocatedRoomDetails"}}, {$project: { _id: 0, hostelCode: "$hostelCode", totalSeat: {$sum: "$roomDetails.roomCapacity"}, availableSeat:{$subtract : [{$sum: "$roomDetails.roomCapacity"}, {$size: "$studentsAllocatedRoomDetails"}]}}}, {$skip: (pageIndex-1)*2}, {$limit: 2}]);
    }else{
      hostelCapacityAndAvailableSeats = await hostelModel.aggregate([{$lookup: {from: "floors", localField: "hostelCode", foreignField: "hostelCode", as:"floorDetails"}}, {$lookup: {from: "rooms", localField: "floorDetails.floorCode", foreignField: "floorCode", as:"roomDetails"}}, {$lookup: {from: "students", localField: "roomDetails.roomCode", foreignField: "allocatedRoomCode", as: "studentsAllocatedRoomDetails"}}, {$project: { _id: 0, hostelCode: "$hostelCode", totalSeat: {$sum: "$roomDetails.roomCapacity"}, availableSeat:{$subtract : [{$sum: "$roomDetails.roomCapacity"}, {$size: "$studentsAllocatedRoomDetails"}]}}}, {$skip: (pageIndex-1)*2}, {$limit: 2}]);
    }
    if(hostelCapacityAndAvailableSeats.length == 0) throw new Error("No more data found!!!");
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({data: hostelCapacityAndAvailableSeats});
    res.end()
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminRectorViewRoomController = async (req, res) => {
  try{
    let pageIndex = (req.query.page) ? Number(req.query.page) : 1;

    let docs = await floorModel.aggregate([{$lookup: {from: "rooms", localField: "floorCode", foreignField: "floorCode", as: "roomDetails"}}, {$project: {_id: 0, hostelCode: 0, __v: 0, "roomDetails._id": 0, "roomDetails.floorCode": 0, "roomDetails.__v": 0}}, {$skip: (pageIndex-1)*2}, {$limit: 2}])
    if(docs.length == 0) throw new Error("No more data found!!!");
    res.json({data: docs})
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminRectorCheckApproximateAvailableSeats = async (req, res) => {
  try{
    let { month, year } = req.params;
    let [monthInt, yearInt] = [Number(month), Number(year)];
    if(!month || !year) throw new Error("Please enter valid month and year!!!");
    let queryForAvailableSeats = await hostelModel.aggregate([{$lookup: {from: "floors", localField: "hostelCode", foreignField: "hostelCode", as:"floorDetails"}}, {$lookup: {from: "rooms", localField: "floorDetails.floorCode", foreignField: "floorCode", as:"roomDetails"}}, {$lookup: {from: "students", localField: "roomDetails.roomCode", foreignField: "allocatedRoomCode", as: "studentsAllocatedRoomDetails"}}, {$project: { _id: 0, hostelCode: "$hostelCode", totalSeat: {$sum: "$roomDetails.roomCapacity"}, availableSeat:{$subtract : [{$sum: "$roomDetails.roomCapacity"}, {$size: "$studentsAllocatedRoomDetails"}]}}}]);

    let totalAvailableSeats = 0;
    queryForAvailableSeats.forEach( obj => {
      totalAvailableSeats+=Number(obj.availableSeat);
    })
    let queryApproximateAvailabilitySeat = await studentModel.aggregate([{$match: {$and: [{"courseDetails.coursePassoutYear": {$lte: yearInt}}, {"courseDetails.coursePassoutMonth": {$lte: monthInt}}]}}]);
    let approximateAvailableSeats = 0;
    approximateAvailableSeats = (queryApproximateAvailabilitySeat.length) ? totalAvailableSeats + queryApproximateAvailabilitySeat.length : totalAvailableSeats;
    res.status(200).json({ approximateAvailableSeats})
    console.log(totalAvailableSeats)
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
  adminRectorCheckHostelController,
  adminRectorViewRoomController,
  adminRectorCheckApproximateAvailableSeats
}

// db.students.aggregate([{$match: {$or: [{$and: [{"courseDetails.coursePassoutYear": {$lte: 2021}}, {"courseDetails.coursePassoutMonth": {$lte: 8}}]}, {$and: [{"courseDetails.courseAdmissionYear": {$eq: 2021}}, {"courseDetails.courseAdmissionMonth": {$eq: 8}}]}]}}])