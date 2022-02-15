const net = require('net');
const portNum = process.argv[2];

let makeFormat = digit => {
    return (digit< 10 ? '0' : '') + digit;
}

let dateAndTime = () => {
    let d = new Date();
    return `${d.getFullYear()}-${makeFormat(d.getMonth()+1)}-${makeFormat(d.getDate())} ${makeFormat(d.getHours())}:${makeFormat(d.getMinutes())}`;
}

const server = net.createServer( socket => {
    socket.end(dateAndTime() + "\n");
}).listen(Number(portNum));

console.log(dateAndTime());