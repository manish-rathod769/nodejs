const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/connection');
const { indexRoute } = require('./controller/users/users.controller');

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

// Requiring Route Files
app.get("/", indexRoute);
app.use("/", require("./routes/users.routes"));
app.use("/", require("./routes/post.routes"));

app.listen(portNum, () => console.log(`Server runnig on http://localhost:${portNum}/`));