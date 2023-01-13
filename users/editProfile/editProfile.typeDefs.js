import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
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

export default typeDefs;
