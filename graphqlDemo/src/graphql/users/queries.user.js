const { GraphQLList, GraphQLID } = require('graphql');

const { UserType } = require('../types');
const { User } = require('../../models/index');

const getAllUser = {
  type: new GraphQLList(UserType),
  description: 'Get all users',
  resolve() {
    try {
      return User.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const getOneUser = {
  type: UserType,
  description: 'Get one user',
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    try {
      return User.findById(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  getAllUser, getOneUser,
};
