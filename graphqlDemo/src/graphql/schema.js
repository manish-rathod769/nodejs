// Import stuff from graphql
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Import queries
const queries = require('./queries');

// Import mutations
const mutations = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queery Type',
  fields: {},
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation Type',
  fields: {},
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
