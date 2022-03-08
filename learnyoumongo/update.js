const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const dbName = process.argv[2];
const client = new MongoClient(url);

async function connection(){
  try{await client.connect();
  const db = client.db(dbName);
  const col = db.collection("users");
  const updatedData = await col.updateOne({username:"tinatime"}, {$set: {age: 40}});
  console.log(updatedData);
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }
}

connection();