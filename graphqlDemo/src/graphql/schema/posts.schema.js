// Import stuff from graphql
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Import queries
const { getAllPost, getOnePost } = require('../posts/queries.post');

// Import mutations
const { addPost, updatePost, deletePost } = require('../posts/mutations.post');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queery Type',
  fields: {
    getAllPost, getOnePost,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation Type',
  fields: {
    addPost, updatePost, deletePost,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
