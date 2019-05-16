import gql from 'graphql-tag';

export const allUsersQuery = gql`
    {
        allUsers {
            id
            username
            email
        }
    }
`;
