import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult
    editProfile(
      email: String
      name: String
      location: String
      avatarURL: String
      gihubUsername: String
      password: String
    ): EditProfileResult
  }
`;
