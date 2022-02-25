const fs = require('fs');

module.exports = (filePath, callback) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if(err) return callback(new Error(err));
        callback(null, data);
    })
}