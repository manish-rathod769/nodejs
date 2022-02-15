const http = require('http');
const map = require('through2-map');
const portNum = process.argv[2];

const server = http.createServer( (req, res) => {

    if(req.method != 'POST') return;

    res.writeHead(200, { 'content-type': 'text/plain' })

    req.pipe( map(function(chunk){
        return chunk.toString().toUpperCase();
    })).pipe(res);
}).listen(portNum);