import { gql } from "apollo-server";

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
`;

export default typeDefs;
