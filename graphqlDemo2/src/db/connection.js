/* eslint-disable no-console */
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });
    console.log('Connect with database successfully...');
  } catch (error) {
    console.log(new Error(error.message));
    process.exit(1);
  }
};

module.exports = connectToDB;
