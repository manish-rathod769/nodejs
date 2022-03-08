const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const size = process.argv[2];

async function connection(){
  try{
    await client.connect();
    const db = client.db("learnyoumongo");
    const col = db.collection("prices");
    const matchedData = await col.aggregate([{ $match: {size: size}}, { $group: {_id: 'average', average: {$avg: '$price'}}}]).toArray();
    console.log(Number(matchedData[0].average).toFixed(2));
  }catch(e){
    console.error(e);
  }finally{
    client.close();
  }
}

connection();