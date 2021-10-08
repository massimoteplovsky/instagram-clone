export const Path = {
  DASHBOARD: '/',
  EXPLORE: '/explore',
  ACCOUNT: (username = ':username') => `/${username}`,
  POST: (postId = ':postId') => `/p/${postId}`,
  EDIT: '/accounts/edit',
  LOGIN: '/accounts/login',
  SIGNUP: '/accounts/signup',
  DEFAULT: '*',
};
