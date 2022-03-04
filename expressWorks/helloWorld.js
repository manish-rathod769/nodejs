const express = require("express");
const app = express();
const portNum = process.argv[2];

app.get('/home', (req, res) => {
  res.send("Hello World!");
});

app.listen(portNum, () => console.log(`Server running on http://localhost:${portNum}`));