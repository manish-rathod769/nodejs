const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/learnyoumongo";
const agePara = Number(process.argv[2]);

MongoClient.connect(url, (err, db) => {
  if(err) throw err;
  const col = db.collection('parrots');
  col.find({
    // age: {$gt:  agePara}
  }).toArray( (err, documents) => {
    if(err) throw err;
    console.log(documents);
    db.close();
  });  

});