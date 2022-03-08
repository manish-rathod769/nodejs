const { MongoClient } = require('mongodb');
const url = `mongodb://localhost:27017/${process.argv[2]}`;
const collectionName = process.argv[3];
const id = process.argv[4];

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  db.collection(collectionName).remove({_id: id}, (err) => {
    if(err) throw err;
    db.close();
  });
})