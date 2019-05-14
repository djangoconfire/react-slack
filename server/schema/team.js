export default `
  type Team {
    id: Int!
    owner: User!
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