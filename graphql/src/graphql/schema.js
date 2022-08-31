// Import requires field from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const { users } = require('./queries');

// Import mutations
const { register } = require('./mutation');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'All queries',
  fields: { users },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'All mutations',
  fields: { register },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
