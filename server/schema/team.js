export default `
  type Team {
    id: Int!
    name: String!
    owner: User!
    channels: [Channel!]!
    members: [User!]!
    errors: [Error!]
  }

  type Query {
    allTeams: [Team!]!
  }

  type CreateTeamResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createTeam(name: String!) : CreateTeamResponse!
  }
`;