const express = require("express");
const path = require("path");
const app = express();
const portNum = process.argv[2];

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile("index.html");
});

app.listen(portNum, () => console.log(`Server running on http://localhost:${portNum}`));