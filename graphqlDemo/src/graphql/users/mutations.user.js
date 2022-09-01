const { hash, compare } = require('bcrypt');
const { GraphQLString, GraphQLNonNull } = require('graphql');

const generateToken = require('../../utils/generateToken');
const { User } = require('../../models/index');

const addUser = {
  type: GraphQLNonNull(GraphQLString),
  description: 'Add a new user',
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
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
      const savedUser = await user.save();

      // Generate token and send response
      const token = generateToken(savedUser);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const loginUser = {
  type: GraphQLNonNull(GraphQLString),
  description: 'Login user',
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    try {
      const { email, password } = args;

      // Check if user exist or not
      const matchedUser = await User.findOne({ email });
      if (!matchedUser) {
        throw new Error('Invalid credentials');
      }

      // Check if user entered password is valid or not
      const matchPassword = await compare(password, matchedUser.password);
      if (!matchPassword) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken(matchedUser);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = {
  addUser, loginUser,
};
