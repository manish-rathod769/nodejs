const express = require('express');
const fs = require('fs');
const app = express();
const portNum = process.argv[2];
const fileToBeRead = process.argv[3] || "./public/object.json";

app.get('/books', (req, res) => {
  fs.readFile(fileToBeRead, 'utf8', (err, data) => {
    if(err) throw err;
    res.json(JSON.parse(data));
  });
});

app.listen(portNum);