const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const obj = { firstName: process.argv[2], lastName: process.argv[3]}

async function connection(){
  try{
    await client.connect();
    const db = client.db("learnyoumongo");
    const collection = db.collection("parrots");
    const data = await collection.insertOne(obj);
    console.log(JSON.stringify(obj));
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }
}

connection();