/* eslint-disable no-use-before-define */
const {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList,
} = require('graphql');

const { User, Post, Comment } = require('../models/index');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent) {
        return Post.find({ userId: parent.id });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Type',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({ postId: parent.id });
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment Type',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    postId: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    post: {
      type: PostType,
      resolve(parent) {
        return Post.findById(parent.postId);
      },
    },
  }),
});

module.exports = {
  UserType, PostType, CommentType,
};
