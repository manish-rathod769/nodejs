const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    userId: ID!
    title: String!
    body: String!
    user: User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginUser{
    email: String!
    password: String!
  }

  input PostInput {
    title: String!
    body: String!
  }

  type Query {
    getAllUser: [User]
    getOneUser(_id: ID!): User
    getAllPost: [Post]
    getOnePost(_id: ID!): Post
  }

  type Mutation {
    createUser(input: UserInput): String!
    loginUser(input: LoginUser): String!
    createPost(input: PostInput): Post!
    updatePost(_id: ID!, title: String!, body: String!): Post!
    deletePost(_id: ID!) : String!
  }

`);
