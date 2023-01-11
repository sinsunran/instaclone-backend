import { gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    gihubUsername: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    seeProfile(username: String): User
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      avatarURL: String
      gihubUsername: String
      password: String!
    ): User
  }
`;

export default typeDefs;
