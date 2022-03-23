const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.MONGODB_URL;

const connectToDB = async () => {
  try{
    const con = await mongoose.connect(url, {
      useNewUrlParser: true
    });
    console.log("Connect with database successfully...");
  }catch(e){
    console.log(new Error(e.message));
  }
}

module.exports = connectToDB;