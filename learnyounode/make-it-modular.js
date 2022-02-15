const mymodule = require('./mymodule')
const dirPath = process.argv[2];
const filterExt = process.argv[3];

mymodule(dirPath, filterExt, (err, filesList) => {
    if(err) return console.error(err);
    filesList.forEach(file => {
        console.log(file)
    })
})