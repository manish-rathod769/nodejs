/* eslint-disable no-console */
const mongoose = require('mongoose');

const conncectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }

  console.log('Conncected to MongoDB successfully...');
};

module.exports = {
  conncectDB,
};
