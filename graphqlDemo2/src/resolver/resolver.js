/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');

const { ObjectId } = mongoose.Types;
const { User, Post } = require('../models');

const generateToken = require('../utils/generateToken');

const resolvers = {
  createUser: async ({ input }) => {
    try {
      const {
        firstName, lastName, email, password,
      } = input;

      // // Generate hashed password
      const hashedPassword = await hash(password, 10);

      // // Add data into database
      const user = new User({
        firstName, lastName, email, password: hashedPassword,
      });
      const savedUser = await user.save();

      // Generate token and return it
      const token = generateToken(savedUser);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  loginUser: async ({ input }) => {
    try {
      const { email, password } = input;

      // Check if user exist or not
      const matchedUser = await User.findOne({ email });

      if (!matchedUser) {
        throw new Error('Invalid credentials');
      }
      const passwordMatched = await compare(password, matchedUser.password);
      if (!passwordMatched) {
        throw new Error('Invalid credentials');
      }

      // Genarate token and return it
      const token = generateToken(matchedUser);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllUser: async () => {
    try {
      const allUser = await User.aggregate([
        {
          $lookup: {
            from: 'posts', localField: '_id', foreignField: 'userId', as: 'posts',
          },
        },
      ]);
      return allUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getOneUser: async (input) => {
    try {
      const matchedUser = await await User.aggregate([
        { $match: { _id: ObjectId(input._id) } },
        {
          $lookup: {
            from: 'posts', localField: '_id', foreignField: 'userId', as: 'posts',
          },
        },
      ]);

      // Check if user exist or not
      if (!matchedUser.length) {
        throw new Error('No user with the given ID found !!!');
      }
      return matchedUser[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  createPost: async ({ input }, { user }) => {
    try {
      const { title, body } = input;

      // Check if user exist or not
      const matchedUser = await User.findOne({ _id: user.id });
      if (!matchedUser) {
        throw new Error('No user with the given ID found !!!');
      }

      // Add data into database
      const post = new Post({
        title, body, userId: user.id,
      });
      const savedPost = await post.save();

      // Fetch post and user data
      const matchedPost = await Post.aggregate([
        { $match: { _id: ObjectId(savedPost._id) } },
        {
          $lookup: {
            from: 'users', localField: 'userId', foreignField: '_id', as: 'user',
          },
        },
        { $unwind: '$user' },
      ]);
      return matchedPost[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllPost: async (input, { user }) => {
    try {
      // Check if user is logged in or not
      if (!user) {
        throw new Error('You must be logged in to get all posts !!!');
      }

      // Fetch all posts
      const allPosts = await Post.aggregate([
        {
          $lookup: {
            from: 'users', localField: 'userId', foreignField: '_id', as: 'user',
          },
        },
        { $unwind: '$user' },
      ]);

      return allPosts;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getOnePost: async (input, { user }) => {
    try {
      // Check if user is logged in or not
      if (!user) {
        throw new Error('You must be logged in to get one posts !!!');
      }

      const matchedPost = await Post.aggregate([
        { $match: { _id: ObjectId(input._id) } },
        {
          $lookup: {
            from: 'users', localField: 'userId', foreignField: '_id', as: 'user',
          },
        },
        { $unwind: '$user' },
      ]);

      // Check if post exists or not
      if (!matchedPost.length) {
        throw new Error('No post with the given ID found !!!');
      }
      return matchedPost[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updatePost: async (input, { user }) => {
    try {
      const { _id, title, body } = input;
      // Check if user is logged in or not
      if (!user) {
        throw new Error('You must be logged in to update a post !!!');
      }

      // Check if provided post id is valid or not for user
      const updatedPost = await Post.findOneAndUpdate(
        { _id, userId: user.id },
        { title, body },
      );

      if (!updatedPost) {
        throw new Error('No post with the given ID found for the user !!!');
      }

      const postUserData = await Post.aggregate([
        { $match: { _id: ObjectId(_id), userId: ObjectId(user.id) } },
        {
          $lookup: {
            from: 'users', localField: 'userId', foreignField: '_id', as: 'user',
          },
        },
        { $unwind: '$user' },
      ]);
      return postUserData[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deletePost: async (input, { user }) => {
    try {
      const { _id } = input;
      // Check if user is logged in or not
      if (!user) {
        throw new Error('You must be logged in to delete a post !!!');
      }

      // Check if provided post id is valid or not for user
      const deletedPost = await Post.findOneAndDelete({ _id, userId: user.id });

      if (!deletedPost) {
        throw new Error('No post with the given ID found for the user !!!');
      }

      return 'Post deleted successfully...';
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = resolvers;
