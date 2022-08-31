/* eslint-disable no-unused-vars */
const { GraphQLList, GraphQLID } = require('graphql');

const { UserType } = require('./types');
const { User, Post, Comment } = require('../models/index');

const getAllUser = {
  type: new GraphQLList(UserType),
  description: 'Get all users',
  resolve(parent, args) {
    return User.find();
  },
};

const getOneUser = {
  type: UserType,
  description: 'Get one user',
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findById(args.id);
  },
};

module.exports = {
  getAllUser, getOneUser,
};
