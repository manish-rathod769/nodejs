const http = require('http');

const handleGetRequest = (req, res) => {
  const pathname = req.url;
  if(pathname === '/users'){
    res.end(JSON.stringify([]));
  }
}

// Creates server instance
const server = http.createServer((req, res) => {
  // Write server code here
  const { method } = req;

  switch(method){
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error("This is not GET request.");
  }
});

// Starts server listening on specified port
server.listen(4001, () => {
  const { address, port } = server.address();

  console.log(`Server is listening on: http://${address}:${port}`);
});