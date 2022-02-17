const http = require('http');

const server = http.createServer( (req, res) => {
    res.end("Hello World")
}).listen(4001);