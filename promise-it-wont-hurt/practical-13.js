var qiohttp = require('q-io/http');

qiohttp.read("http://localhost:7000/")
.then(function (id) {
  return qiohttp.read("http://localhost:7001/" + id);
})
.then(function (json) {
  console.log(JSON.parse(json));
})
.then(null, console.error)