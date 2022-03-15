const mongoose = require('mongoose');

let connectToDB = async () => {
  try{
    mongoose.connect('mongodb://localhost:27017/hostel_management_system', {
      useNewUrlParser: true
    });
    console.log('Connect to database...');
  }catch(e){
    console.log(new Error(e) || "Falied to connect with database !!!");
  }
}

module.exports = { connectToDB };