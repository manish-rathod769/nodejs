const http   = require('http');
const urlCmd = process.argv[2];

http.get(urlCmd, res => {
    res.setEncoding('utf8');
    res.on('data', chunk => console.log(chunk));
    res.on('error', console.error);
    // res.on('end', () => console.log("end of file."))
}).on('error', console.error);