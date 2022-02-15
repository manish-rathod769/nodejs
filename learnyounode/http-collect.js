const http = require('http');
const bl = require('bl');
const urlCmd = process.argv[2];

http.get(urlCmd, res => {
    res.pipe(bl( (err, data) => {
        if(err){
            return console.error(err);
        }
        data = data.toString();
        console.log(data.length);
        console.log(data);
    }))
})