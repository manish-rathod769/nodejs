/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./src/graphql/schema');
const connectToDB = require('./src/db/connection');
const authorization = require('./src/middlewares/auth');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Make connection with database
connectToDB();
app.use(authorization);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
