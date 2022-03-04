const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use("/users", express.static(path.join(__dirname, 'usersData')));

app.get('/', (req, res) => {
  res.send("We can not access directory without making it static in express.");
});

app.listen(port, () => console.log(`Server running on http://localhost:3000`));