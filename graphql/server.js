/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');

const { conncectDB } = require('./db/conncetDB');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
conncectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}...`));
