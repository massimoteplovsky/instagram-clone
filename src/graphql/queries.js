import { gql } from 'apollo-boost';

export const CHECK_IF_USERNAME_TAKEN = gql`
  query checkIfUsernameTaken($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
    }
  }
`;

export const GET_USER_EMAIL = gql`
  query getUserEmail($input: String!) {
    users(
      where: {
        _or: [{ phone_number: { _eq: $input } }, { username: { _eq: $input } }]
      }
    ) {
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    users(
      where: {
        _or: [{ username: { _iregex: $query } }, { name: { _iregex: $query } }]
      }
    ) {
      id
      username
      name
      profile_image
    }
  }
`;
