const fs = require('fs');

let readFileUsingCallback = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if(err) return callback(new Error(err));
      callback(null, data);
  });
}

let readFileUsingPromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if(err) return reject(new Error(err));
      resolve(data);
    });
  });
}

let readFileUsingAsyncAwait = async (filePath) => {
  try{
      return await fs.promises.readFile(filePath, "utf-8");
  }catch(err){
      console.error(new Error(err));
  }
}

module.exports = {
  readFileUsingCallback,
  readFileUsingPromise,
  readFileUsingAsyncAwait
}