const fs = require("fs");
const path = require("path");
const dirPath = process.argv[2];
const filterExt = "." + process.argv[3];

const dirBuff = fs.readdir(dirPath, (err, filesList) => {
    if(err){
        return console.error(err);
    }
    filesList.forEach( file => {
        if(path.extname(file) === filterExt){
            console.log(file)
        }
    })
})