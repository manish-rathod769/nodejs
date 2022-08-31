const { GraphQLID, GraphQLList } = require('graphql');

const { Comment } = require('../../models/index');
const { CommentType } = require('../types');

const getAllComments = {
  type: new GraphQLList(CommentType),
  description: 'Get all comments',
  resolve(parent, args, { user }) {
    try {
      // Check if user is logged in or not
      if (!user) {
        throw new Error('You must be logged in to get all comments !!!');
      }
      return Comment.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getOneComment = {
  type: CommentType,
  description: 'Get one comment',
  args: { id: { type: GraphQLID } },
  async resolve(parent, args, { user }) {
    try {
      // Check if user is logged in or not
      if (!user) {
        throw new Error('You must be logged in to get one comment !!!');
      }

      const matchedComment = await Comment.findById(args.id);
      if (!matchedComment) {
        throw new Error('No comment with the given ID found !!!');
      }
      return matchedComment;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  getAllComments,
  getOneComment,
};
