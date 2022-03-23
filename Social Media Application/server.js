const express = require('express');
const path = require('path');


// Require .env file
require('dotenv').config();

const app = express();
const portNum = process.env.PORT;

// Setting View Engine
app.set("view engine", "ejs");

// Load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

app.use("/", require("./routes/route"));


app.listen(8080, () => console.log(`Server runnig on http://localhost:${portNum}/`));