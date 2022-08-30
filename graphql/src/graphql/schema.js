// Import requires field from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const { } = require('./queries');

// Import mutations
const { } = require('./mutation');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'All queries',
  fields: {},
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'All mutations',
  fields: {},
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
