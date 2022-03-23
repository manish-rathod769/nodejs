const express = require('express');
const { hash } = require('bcrypt');
const userRegisterModel = require('../model/user.register.model');
const insertDocument = require('../utils/helper/insertDocument.helper');

const userRegister = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password) throw new Error("Please provies all details of user...");
    const encryptedPassword = await hash(password, 10);
    
    await userRegisterModel.find()
    .then( users => {
      users.forEach(user => {
        if(user.email === email) throw new Error("Email already exist !!!");
      });
    });

    const userDetails = new userRegisterModel({
      name,
      email,
      password: encryptedPassword
    })
    insertDocument(req, res, userDetails, "User Registration Successfull...");
  }catch(e){
    res.json({ is_error: true, message: e.message });
  }
}

module.exports = userRegister;