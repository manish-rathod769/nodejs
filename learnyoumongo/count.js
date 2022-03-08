const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const age = Number(process.argv[2]);

async function connection(){
  try{
    await client.connect();
    const db = client.db("learnyoumongo");
    const col = db.collection("parrots");
    const totalCount = await col.count({age: {$gt: age}});
    console.log(totalCount);
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }
}

connection();