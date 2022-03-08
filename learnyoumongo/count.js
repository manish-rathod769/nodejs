const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/learnyoumongo";
const age = Number(process.argv[2]);

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  db.collection('parrots').count({age: {$gt: age}}, (err, count) => {
    if(err) throw err;
    console.log(count);
    db.close();
  });
})