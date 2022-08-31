// Import stuff from graphql
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Import queries
const { getAllUser, getOneUser } = require('./users/queries.user');
const { getAllPost, getOnePost } = require('./posts/queries.post');

// Import mutations
const { addUser, loginUser } = require('./users/mutations.user');
const { addPost, updatePost, deletePost } = require('./posts/mutations.post');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queery Type',
  fields: {
    getAllUser, getOneUser, getAllPost, getOnePost,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation Type',
  fields: {
    addUser, loginUser, addPost, updatePost, deletePost,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
