import gql from 'graphql-tag';

const query = gql`
  query User {
    user {
      _id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

export default query;
