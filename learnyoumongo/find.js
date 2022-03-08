const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const age = Number(process.argv[2]);

async function connection(){
  try{
    await client.connect();
    const db = client.db("demoDB");
    const collection = db.collection("students");
    const data = await collection.find({}).toArray();
    console.log(data)
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }
}

connection();