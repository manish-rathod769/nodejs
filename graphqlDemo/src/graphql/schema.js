// Import stuff from graphql
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

// Import queries
const { getAllUser, getOneUser } = require('./users/queries.user');
const { getAllPost, getOnePost } = require('./posts/queries.post');
const { getAllComments, getOneComment } = require('./comments/queries.comment');

// Import mutations
const { addUser, loginUser } = require('./users/mutations.user');
const { addPost, updatePost, deletePost } = require('./posts/mutations.post');
const { addComment, updateComment, deleteComment } = require('./comments/mutations.comment');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queery Type',
  fields: {
    getAllUser, getOneUser, getAllPost, getOnePost, getAllComments, getOneComment,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation Type',
  fields: {
    addUser, loginUser, addPost, updatePost, deletePost, addComment, updateComment, deleteComment,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
