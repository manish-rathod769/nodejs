/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');

const { conncectDB } = require('./src/db/conncetDB');
const schema = require('./src/graphql/schema');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
conncectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}...`));
