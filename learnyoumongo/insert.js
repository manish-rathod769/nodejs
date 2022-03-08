const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/learnyoumongo";
const fname = process.argv[2];
const lname = process.argv[3];

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  db.collection('docs').insert({firatname: fname, lastname: lname}, (err, document) => {
    if(err) throw err;
    console.log(JSON.stringify(document.ops[0]));
  });
  db.close();
})