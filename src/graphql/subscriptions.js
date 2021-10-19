import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
  subscription getCurrentUser($userId: String) {
    users(where: { user_id: { _eq: $userId } }) {
      last_checked
      id
      user_id
      username
      profile_image
      name
      phone_number
      website
      email
      bio
      followers {
        user_id
      }
      following {
        profile_id
      }
      notifications(order_by: { created_at: desc }) {
        id
        type
        created_at
        post {
          id
          image
        }
        user {
          id
          username
          name
          profile_image
        }
      }
    }
  }
`;

export const GET_POST = gql`
  subscription getPost($postId: uuid!) {
    posts_by_pk(id: $postId) {
      id
      caption
      created_at
      image
      location
      user {
        id
        username
        name
        profile_image
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes {
        id
        user_id
      }
      saved_posts {
        id
        user_id
      }
      comments(order_by: { created_at: desc }) {
        id
        content
        created_at
        users {
          username
          profile_image
        }
      }
    }
  }
`;

export const GET_PROFILE = gql`
  subscription getProfile($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
      id
      name
      bio
      profile_image
      website
      followers {
        user {
          name
          profile_image
          username
          id
        }
      }
      following {
        user {
          id
          name
          profile_image
          username
        }
      }
      posts {
        id
        image
        likes_aggregate {
          aggregate {
            count
          }
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
      saved_posts {
        post {
          id
          image
          likes_aggregate {
            aggregate {
              count
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;
