import { gql } from "apollo-server";

export default gql`
  type JoinResult {
    ok: Boolean!
    error: String
    id: String
  }
  type Mutation {
    join(
      username: String!
      email: String!
      name: String!
      location: String
      avatarURL: String
      gihubUsername: String
      password: String!
    ): JoinResult
  }
`;
