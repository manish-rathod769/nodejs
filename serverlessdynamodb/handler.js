const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
  }

  try{
    const Items = await dynamoDbClient.scan(params).promise();
    return res.json(Items);
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Could not retreive user" });
  }

});

app.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/users", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ userId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.put("/users/:userId", async (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  
  if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }
  console.log(userId);
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId,
    },
    ExpressionAttributeNames: {
      '#todo_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': name,
    },
    UpdateExpression: 'SET #todo_name = :name',
    ReturnValues: 'ALL_NEW',
  };

  try{
    const result = await dynamoDbClient.update(params).promise();
    console.log(result);
    return res.json(result);
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  if(!userId) return res.json({ errorMessage: 'User not found'});

  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId,
    },
  }

  try{
    await dynamoDbClient.delete(params).promise();
    return res.json({message: 'User deleted successfully'});
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
