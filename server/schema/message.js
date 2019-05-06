export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel
  }

  type Mutation {
      createMessage(chaneelId: Int!, text: String!): Boolean!
  }
`;