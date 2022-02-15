const fs = require("fs");
const path = require("path");

module.exports = (dirPath, filterExt, callback) => {
    fs.readdir(dirPath, (err, filesList) => {
        if(err){
            return callback(err);
        }
        filesList = filesList.filter( file => {
            return path.extname(file) === "." + filterExt;
        });

        return callback(null, filesList);

    });
}