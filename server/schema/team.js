export default `
  type Team {
    id: Int!
    owner: User!
    memebers: [User!]!
    channels: [Channel!]!
  }

  type Query {
    allTeams: [Team!]!
  }
  type Mutation {
    createTeam(name: String!) : Boolean!
  }
`;