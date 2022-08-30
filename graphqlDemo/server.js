/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');

const connectToDB = require('./src/db/connection');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Make connection with database
connectToDB();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
