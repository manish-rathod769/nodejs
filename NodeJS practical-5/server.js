const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const { connectToDB } = require(path.join(__dirname, "/connection/connection"));
// const { userModel, adminCollection, rectorCollection, hostelCollection, floorCollection, roomCollection, studentPersonalCollection, studentAcademicCollection, studentContactCollection } = require(path.join(__dirname, "/model/models"));

const app = express();

// Use dotenv file
dotenv.config({path: "./config.env"})
const portNum = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect application to the Database
connectToDB();

// Load ROuters
// app.use("/", require("./routes/router"));
app.use("/", require("./routes/admin.route"));
app.use("/", require("./routes/rector.route"));

app.listen(portNum, () => console.log(`Server runnig on http://localhost:${portNum}`));