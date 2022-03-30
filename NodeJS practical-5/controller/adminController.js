const { verify } = require('jsonwebtoken');
const { hash } = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { rectorModel, adminModel } = require('../model/admin/admin.rector.model');
const hostelModel = require('../model/admin/hostel.model.js');
const floorModel = require('../model/admin/floor.model.js');
const roomModel = require('../model/admin/room.model');

const insertDocUtil = require("../helper/insertDocUtil");

let adminAddRector = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password) throw new Error("Name, Email and password must be provided!!!")
  
    const encryptedPassword = await hash(req.body.password, 10);
    const rectorDetails = new rectorModel({
      name,
      email,
      password: encryptedPassword,
      accessToken: ""
    });

    await rectorModel.find()
    .then( rectors => {
      rectors.forEach(rector => {
        if(rector.email === email) throw new Error("Email already exist !!!");
      });
    });

    insertDocUtil(req, res, rectorDetails, "Rector Details Added Successfully...");    
  }catch(e){
    res.status(404).json({ error: e.message });
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
    let { floorCode, hostelID } = req.body;
    if(!floorCode || ! hostelID ) throw new Error("Floor code and HostelID must be provided!!!");
    hostelID = ObjectId(hostelID);
    const floorDetails = new floorModel({
      floorCode,
      hostelID
    });
    
    const matchedFloor = await floorModel.find({floorCode, hostelID});
    if(matchedFloor.length) throw new Error("Data already exists in Database!!!"); 
    
    const matchedHostel = await hostelModel.find({_id: hostelID});
    if(!matchedHostel.length) throw new Error("HostelID does not found in Database!!!");

    insertDocUtil(req, res, floorDetails, "Floor Details Added Successfully...");
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

let adminAddRoom = async (req, res) => {
  try{
    let { roomCode, floorID, roomCapacity } = req.body;
    if(!roomCode || !floorID || !roomCapacity ) throw new Error("Room code, Floor code and Room capacity must be provided!!!");
    floorID = ObjectId(floorID);
    const roomDetails = new roomModel({
      roomCode,
      floorID,
      roomCapacity
    });

    const matchedRoom = await roomModel.find({roomCode, floorID});
    if(matchedRoom.length) throw new Error("Data already exists in Database!!!"); 
    
    const matchedFloor = await floorModel.find({_id: floorID});
    if(!matchedFloor.length) throw new Error("FloorID does not found in Database!!!");

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