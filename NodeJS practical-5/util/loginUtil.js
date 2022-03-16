const { compare } = require('bcryptjs');
const {createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken} = require("../helper/tokens");

let loginUtil = async (req, res, model) => {
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
    const refreshToken = createRefreshToken(matchedData[0].email);
    
    await model.findByIdAndUpdate( matchedData[0]._id, { refreshToken: refreshToken })
    .then(() => {
      sendRefreshToken(req, res, refreshToken, ["/admin/login", "/admin/add/hostel", "/admin/add/floor", "/admin/add/room", "/admin/add/rector", "admin/add/student", "rector/add/student"]);
      sendAccessToken(req, res, accessToken);
    })

  }catch(err){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: err.message });
    res.end();
  }
}

module.exports = loginUtil;