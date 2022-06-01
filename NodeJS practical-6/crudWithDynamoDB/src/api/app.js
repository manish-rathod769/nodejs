const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();
dotenv.config();
app.use(bodyParser());

module.exports.handler = serverless(app);
