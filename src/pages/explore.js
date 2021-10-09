import React from 'react';

// Components
import Layout from '../components/shared/Layout';
import ExploreSuggestions from '../components/explore/ExploreSuggestions';
import ExploreGrid from '../components/explore/ExploreGrid';

const ExplorePage = () => {
  return (
    <Layout>
      <ExploreSuggestions />
      <ExploreGrid />
    </Layout>
  );
};

export default ExplorePage;
