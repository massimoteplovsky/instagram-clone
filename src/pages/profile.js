import React from 'react';
import { useProfilePageStyles } from '../styles';

// Components
import Layout from '../components/shared/Layout';

const ProfilePage = () => {
  useProfilePageStyles();

  return <Layout>ProfilePage</Layout>;
};

export default ProfilePage;
