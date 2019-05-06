export default `
    type Channel {
        id: Int!
        name: String!
        public: Boolean!
        messages: [Message!]!
        users: [User!]!
    }

    type Query {
        allChannels: [Channel!]!
    }

    type Mutation {
        createChannel(name: String!, public: Boolean=false): Boolean!
    }

`;