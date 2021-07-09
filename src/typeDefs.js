import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    profile: User!
    user(userId: ID!): User
    posts: [Post]
    users: [User]
    notifications: [Notification]
  }

  type Mutation {
    singleUpload(file: Upload!): String!
    updateLikes(postId: ID, clientuserName: String): String
    follow(toFollow: ID!): String
    addPost(title: String!, caption: String, public_id: String): String
    removeNotification: String
  }

  type Notification {
    id: ID
    postId: String!
    refUserId: String
    type: String
    content: String
    isRead: Boolean
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
    notifications: [Notification]
  }
  type Success {
    success: Boolean
  }
`;
