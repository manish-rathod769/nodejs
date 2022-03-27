const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/connection');

// Require .env file
require('dotenv').config();

const app = express();
const portNum = process.env.PORT;

// Setting View Engine
app.set("view engine", "ejs");

// Connecting to database
connectToDB();

app.use(express.urlencoded({ extended: false }))
app.use(express.json()); 

app.use(cookieParser());
// Load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/images', express.static(path.resolve(__dirname, "db/Images")));

app.use("/", require("./routes/route"));

app.listen(portNum, () => console.log(`Server runnig on http://localhost:${portNum}/`));