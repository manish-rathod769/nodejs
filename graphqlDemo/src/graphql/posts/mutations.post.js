/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { GraphQLString, GraphQLID, GraphQLList } = require('graphql');

const { PostType } = require('../types');
const { Post, Comment } = require('../../models/index');
const authorization = require('../../middlewares/auth');

const addPost = {
  type: PostType,
  description: 'Add a new post',
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { user }) {
    try {
      const { title, body } = args;
      if (!user) {
        throw new Error('You must be logged in to add a post !!!');
      }

      const post = new Post({
        userId: user.id, title, body,
      });
      const savedPost = await post.save();
      return savedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const updatePost = {
  type: PostType,
  description: 'Update a post',
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { user }) {
    try {
      const { id, title, body } = args;

      // Check if token exists or not
      if (!user) {
        throw new Error('You must be logged in to update a post !!!');
      }

      // Check if provided post id is valid or not for user
      const updatedPost = await Post.findOneAndUpdate(
        { _id: id, userId: user.id },
        { title, body },
        { new: true },
      );

      // Check if post updated or not
      if (!updatedPost) {
        throw new Error('No post with the given ID found for the user !!!');
      }

      return updatedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const deletePost = {
  type: GraphQLString,
  description: 'Delete a post',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args, { user }) {
    try {
      const { id } = args;

      // Check if token exists or not
      if (!user) {
        throw new Error('You must be logged in to update a post !!!');
      }

      const postDeleted = await Post.findOneAndDelete({
        _id: id, userId: user.id,
      });
      if (!postDeleted) {
        throw new Error('No post with the given ID found for the author !!!');
      }

      // If post is deleted then delete related comments to the post
      await Comment.deleteMany({ postId: id });

      return 'Post deleted successfully...';
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  addPost, updatePost, deletePost,
};
