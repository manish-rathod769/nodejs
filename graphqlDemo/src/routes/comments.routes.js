const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const commentSchema = require('../graphql/schema/comments.schema');

const route = express.Router();

route.use('/', graphqlHTTP({
  schema: commentSchema,
  graphiql: true,
}));

module.exports = route;
