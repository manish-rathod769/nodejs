const { rectorModel, adminModel, hostelModel, floorModel, roomModel } = require("../model/models");
const { verify } = require('jsonwebtoken');
const { hash } = require('bcrypt');
const insertDocUtil = require("../util/insertDocUtil");

let adminAddRector = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password) throw new Error("Name, Email and password must be provided!!!")
  
    const encryptedPassword = await hash(req.body.password, 10);
    const rectorDetails = new rectorModel({
      name,
      email,
      password: encryptedPassword,
      refreshToken: ""
    });

    await rectorModel.find()
    .then( rectors => {
      rectors.forEach(rector => {
        if(rector.email === email) throw new Error("Email already exist !!!");
      });
    });

    insertDocUtil(req, res, rectorDetails, "Rector Details Added Successfully...");    
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminAddHostel = async (req, res) => {
  try{
    const { hostelCode } = req.body;
    if(!hostelCode) throw new Error("Hostel code must be provided!!!");

    const hostelDetails = new hostelModel({
      hostelCode
    });

    await hostelModel.find()
    .then( hostels => {
      hostels.forEach(hostel => {
        if(hostel.hostelCode === Number(hostelCode)) throw new Error("Hostel code already exist!!!");
      });
    });

    insertDocUtil(req, res, hostelDetails, "Hostel Details Added Successfully...");

  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminAddFloor = async (req, res) => {
  try{
    const { floorCode, hostelCode } = req.body;
    if(!floorCode || ! hostelCode) throw new Error("Floor code and Hostel code must be provided!!!");

    const floorDetails = new floorModel({
      floorCode,
      hostelCode
    });
    
    await floorModel.find()
    .then( floors => {
      floors.forEach(floor => {
        if(floor.floorCode === Number(floorCode)) throw new Error("Floor code already exist!!!");
      });
    });
    await hostelModel.find()
    .then( hostels => {
      let flag = hostels.some(hostel => hostel.hostelCode === Number(hostelCode));
      if(!flag) throw new Error("Hostel code does not found in Database!!!");
    });

    insertDocUtil(req, res, floorDetails, "Floor Details Added Successfully...");
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

let adminAddRoom = async (req, res) => {
  try{
    const { roomCode, floorCode, roomCapacity } = req.body;
    if(!roomCode) throw new Error("Room code, Floor code and Room capacity must be provided!!!");

    const roomDetails = new roomModel({
      roomCode,
      floorCode,
      roomCapacity
    });

    await roomModel.find()
    .then( rooms => {
      rooms.forEach(room => {
        if(room.roomCode === Number(roomCode)) throw new Error("Room code already exist!!!");
      });
    });
    await floorModel.find()
    .then( floors => {
      let flag = floors.some(floor => floor.floorCode === Number(floorCode));
      if(!flag) throw new Error("Floor code does not found in Database!!!");
    });
    insertDocUtil(req, res, roomDetails, "Room Details Added Successfully...");
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

module.exports = {
  adminAddRector,
  adminAddHostel,
  adminAddFloor,
  adminAddRoom
}