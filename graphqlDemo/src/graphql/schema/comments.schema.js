// Import stuff from graphql
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Import queries
const { getAllComments, getOneComment } = require('../comments/queries.comment');

// Import mutations
const { addComment, updateComment, deleteComment } = require('../comments/mutations.comment');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queery Type',
  fields: {
    getAllComments, getOneComment,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation Type',
  fields: {
    addComment, updateComment, deleteComment,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
