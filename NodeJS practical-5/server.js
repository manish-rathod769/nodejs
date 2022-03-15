const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const { connectToDB } = require(path.join(__dirname, "/database/connection"));
const { userModel, adminCollection, rectorCollection, hostelCollection, floorCollection, roomCollection, studentPersonalCollection, studentAcademicCollection, studentContactCollection } = require(path.join(__dirname, "/model/models"));

const app = express();

// Use dotenv file
dotenv.config({path: "./config.env"})
const portNum = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

// Connect application to the Database
connectToDB();

// Load ROuters
app.use("/", require("./routes/router"));

// app.get("/view/data", async (req, res) => {
//   try{
//     let id = new Object("6230851ad3a4bd1f44346522");
//     await userModel.findOneAndUpdate( id ,{ city: "ABD" }, {new: true}).then( console.log);
//     res.end();
//     await userModel.findOne({name: "Manish"}).then( users => {
//       console.log(users);
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json({users: users});
//       res.end();
//     })
//   }catch(e){
//     res.setHeader('Content-Type', 'application/json');
//     res.status(404).json({ error: e.message });
//   }
// });
app.listen(portNum, () => console.log(`Server runnig on http://localhost:${portNum}`));