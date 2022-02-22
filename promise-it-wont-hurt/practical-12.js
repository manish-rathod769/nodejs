var qiohttp = require('q-io/http');

qiohttp.read("http://localhost:1337")
.then(function (json) {
  console.log(JSON.parse(json));
})
.then(null, (err) => console.log(err));