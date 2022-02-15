const http = require('http')
const fs = require('fs')
const filePath = process.argv[3];

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(filePath).pipe(res)
//   res.end()
})

server.listen(Number(process.argv[2]))