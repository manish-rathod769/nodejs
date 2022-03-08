const { MongoClient } = require('mongodb');
const url = `mongodb://localhost:27017/${process.argv[2]}`;

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  db.collection('users').update({username: "tinatime"}, {$set: {age: 40}}, (err) => {
    if(err) throw err;
    db.close();
  });
})