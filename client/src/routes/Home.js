import React from 'react';
import { gql, graphql } from 'react-apollo';

const Home = ({ data: { allUsers = [] } }) => allUsers.map(u => <h1 key={u.id}>{u.username}</h1>);

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;

export default graphql(allUsersQuery)(Home);