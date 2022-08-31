/* eslint-disable no-console */
const { GraphQLString } = require('graphql');

const {} = require('./types');
const { User, Post, Comment } = require('../models/index');
const generateToken = require('../utils/generateToken');

const register = {
  type: GraphQLString,
  description: 'Register a new user',
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const {
        firstName, lastName, email, password,
      } = args;
      const user = new User({
        firstName, lastName, email, password,
      });

      // Save user in to the database
      await user.save();

      // Generate token for the user
      const token = generateToken(email);
      return token;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  },
};

module.exports = {
  register,
};
