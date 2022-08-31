/* eslint-disable no-console */
const { hash, compare } = require('bcrypt');
const {
  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList,
} = require('graphql');

const { User, Post, Comment } = require('../models/index');
const { UserType, PostType, CommentType } = require('./types');
const generateToken = require('../utils/generateToken');

const addUser = {
  type: GraphQLString,
  description: 'Add a new user',
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
      const hashedPassword = await hash(password, 10);

      // Add data into database
      const user = new User({
        firstName, lastName, email, password: hashedPassword,
      });
      await user.save();

      // Generate token and send response
      const token = generateToken();
      return token;
    } catch (error) {
      return error.message;
    }
  },
};

const loginUser = {
  type: GraphQLString,
  description: 'Login user',
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const { email, password } = args;

      // Check if user exist or not
      const matchedUser = await User.findOne({ email });
      const matchPassword = await compare(password, matchedUser.password);

      if (!matchedUser || !matchPassword) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken(email);
      return token;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  },
};

module.exports = {
  addUser, loginUser,
};
