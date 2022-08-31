const { GraphQLList, GraphQLID } = require('graphql');

const { PostType } = require('../types');
const { Post } = require('../../models/index');

const getAllPost = {
  type: new GraphQLList(PostType),
  description: 'Get all posts',
  resolve(parent, args, { user }) {
    try {
      if (!user) {
        return 'You must be logged in to get all posts !!!';
      }
      return Post.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getOnePost = {
  type: PostType,
  description: 'Get one post',
  args: { id: { type: GraphQLID } },
  async resolve(parent, args) {
    try {
      const matchedPost = await Post.findById(args.id);
      if (!matchedPost) {
        throw new Error('No post with the given ID found !!!');
      }
      return matchedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  getAllPost,
  getOnePost,
};
