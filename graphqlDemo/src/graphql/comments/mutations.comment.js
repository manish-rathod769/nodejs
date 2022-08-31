const { GraphQLString, GraphQLID } = require('graphql');
const { Comment, Post } = require('../../models/index');

const { CommentType } = require('../types');

const addComment = {
  type: CommentType,
  description: 'Add a comment',
  args: {
    postId: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  async resolve(parent, args, { user }) {
    try {
      const { postId, comment } = args;

      // Check if token exists or not
      if (!user) {
        throw new Error('You must be logged in to add a comment !!!');
      }

      // Check if provided post id is valid or not
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('No post with the given ID found !!!');
      }

      // Add comment to the post
      const newComment = new Comment({
        userId: user.id, postId, comment,
      });
      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const updateComment = {
  type: CommentType,
  description: 'Update a comment',
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  async resolve(parent, args, { user }) {
    try {
      const { id, comment } = args;

      // Check if token exists or not
      if (!user) {
        throw new Error('You must be logged in to update a comment !!!');
      }

      // Check if provided comment id is valid or not for user
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: id, userId: user.id },
        { comment },
        { new: true },
      );

      // Check if comment updated or not
      if (!updatedComment) {
        throw new Error('No comment with the given ID found for the user !!!');
      }

      return updatedComment;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const deleteComment = {
  type: GraphQLString,
  description: 'Delete a comment',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args, { user }) {
    try {
      const { id } = args;

      // Check if token exists or not
      if (!user) {
        throw new Error('You must be logged in to delete a comment !!!');
      }

      // Check if provided comment id is valid or not for user
      const deletedComment = await Comment.findOneAndDelete({ _id: id, userId: user.id });

      // Check if comment deleted or not
      if (!deletedComment) {
        throw new Error('No comment with the given ID found for the user !!!');
      }

      return 'Comment deleted successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  addComment, updateComment, deleteComment,
};
