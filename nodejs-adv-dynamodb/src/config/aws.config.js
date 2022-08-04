require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessSecretKey: process.env.ACCESS_SECRET_KEY,
  region: process.env.REGION,
});

module.exports = {
  AWS,
};
