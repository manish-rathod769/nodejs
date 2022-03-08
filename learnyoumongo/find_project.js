const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const age = Number(process.argv[2]);

async function connection(){
  try {
    await client.connect();
    const db = client.db("learnyoumongo");
    const col = db.collection("parrots");
    const data = await col.find({age: {$gt: age}}).project({_id: 0}).toArray();
    console.log(data)
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }

}

connection();