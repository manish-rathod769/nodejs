/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');

const connectToDB = require('./src/db/connection');
// const authorization = require('./src/middlewares/auth');
const schema = require('./src/schema/schema');
const resolvers = require('./src/resolver/resolver');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Make connection with database
connectToDB();
// app.use(authorization);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
