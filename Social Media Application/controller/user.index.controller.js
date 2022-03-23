const express = require('express');

const indexRoute = async (req, res) => {
  try{
    res.render('index');
  }catch(e){
    res.status(404).json({ is_error: true, message: e.message });
  }
}

module.exports = indexRoute;