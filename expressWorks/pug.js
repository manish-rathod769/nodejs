const express = require('express');
const path = require('path');

const app = express();
const portNum = process.argv[2];
const pugFile = process.argv[3];

app.set('view engine', 'pug');
app.set('views', pugFile);
app.get("/home", (req, res) => {
  res.render('index.pug', {date: new Date().toDateString()});
});

app.listen(portNum);