const express = require("express");
const path = require("path");
const port = process.argv[2];
const bodyParser = require("body-parser");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.post("/form", urlencodedParser, (req, res) => {
  res.send(req.body.str.split('').reverse().join(''));
});

app.listen(port);