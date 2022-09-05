const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const postSchema = require('../graphql/schema/posts.schema');

const route = express.Router();

route.use('/', graphqlHTTP({
  schema: postSchema,
  graphiql: true,
}));

module.exports = route;
