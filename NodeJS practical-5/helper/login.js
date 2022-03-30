const { compare } = require('bcryptjs');
const {createAccessToken, sendAccessToken } = require("./tokens");

let login = async (req, res, model) => {
  const { email, password } = req.body;
  try{

    if(!email || !password) throw new Error("Email and password must be provided!!!");
    
    let matchedData = {};
    await model.find()
    .then( records => {
      matchedData = records.filter(record => record.email === email);
    });
    
    if(!matchedData.length) throw new Error("No account found!!!");
    
    const matchedPassword = await compare(password, matchedData[0].password);
    if(!matchedPassword) throw new Error("Password does not match!!!");

    const accessToken = createAccessToken(matchedData[0].email);
    
    await model.findByIdAndUpdate( matchedData[0]._id, { accessToken })
    .then(() => {
      sendAccessToken(req, res, accessToken);
    })

  }catch(err){
    res.status(404).json({ error: err.message });
  }
}

module.exports = login;