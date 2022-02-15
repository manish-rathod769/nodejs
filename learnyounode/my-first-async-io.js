const fs = require('fs');
const filePath = process.argv[2];

const fileBuff = fs.readFile(filePath, (err, data) => {
    if(err){
        return console.log(err);
    }
    const numOfLine = data.toString().split('\n').length - 1;
    console.log(numOfLine);
})