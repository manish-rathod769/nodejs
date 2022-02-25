const fs = require("fs");

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if(err) return reject(new Error(err));
            resolve(data);
        });
    });
}