const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const dbName = process.argv[2];
const collection = process.argv[3];
const uid = process.argv[4];

const client = new MongoClient(url);

async function connection(){
  try{await client.connect();
  const db = client.db(dbName);
  const col = db.collection(collection);
  const removeData = await col.deleteOne({_id: uid});
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }
}

connection();