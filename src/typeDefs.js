import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    profile: User!
    user(userId: ID!): User
    posts: [Post]
  }

  type Mutation {
    singleUpload(file: Upload!): String!
    updateLikes(postId: ID): String
    follow(toFollow: ID!): String
    addPost(title: String!, caption: String, public_id: String): String
  }

  type Book {
    title: String
    author: String
  }
  type Post {
    id: ID!
    postedBy: User
    title: String
    public_id: String
    caption: String
    likes: [User]
  }
  type userLite {
    id: ID!
    fullName: String
    userName: String
  }
  type User {
    name: String
    id: ID!
    userName: String
    password: String
    followers: [userLite]
    following: [userLite]
    posts: [Post]
  }
  type Success {
    success: Boolean
  }
`;
