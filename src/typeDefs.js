import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String
    posts: [Post]
    books: [Book]
    cats: [Cat]
    myCat(id: ID): Cat
    myCatfromName(name: String): [Cat]
  }

  type Mutation {
    books(title: String, author: String): Book
    createCat(naam: String!, maalik: String): String
    updateLikes(postId: ID): String
    addPost(title: String): String
    # addPost(title: String,postedBy: String)
  }

  type Cat {
    id: ID!
    name: String!
    userName: String!
  }
  type Book {
    title: String
    author: String
  }
  type Post {
    id: ID!
    postedBy: User
    title: String
    caption: String
    likes: [User]
  }
  type User {
    id: ID!
    userName: String
    password: String
    # posts:[Post]
  }
`;
