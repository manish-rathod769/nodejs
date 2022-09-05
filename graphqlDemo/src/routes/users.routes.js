const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const userSchema = require('../graphql/schema/users.schema');

const route = express.Router();

route.use('/', graphqlHTTP({
  schema: userSchema,
  graphiql: true,
}));

module.exports = route;
