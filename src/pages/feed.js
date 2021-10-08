import React, { useState } from 'react';
import { Hidden } from '@material-ui/core';
import { useFeedPageStyles } from '../styles';
import { getDefaultPost } from '../data';

// Components
import Layout from '../components/shared/Layout';
import FeedPost from '../components/feed/FeedPost';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
import UserCard from '../components/shared/UserCard';
import LoadingScreen from '../components/shared/LoadingScreen';
import { LoadingLargeIcon } from '../icons';

const FeedPage = () => {
  const cx = useFeedPageStyles();
  const [isFeedEnd, setIsFeedEnd] = useState(false);

  const loading = false;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className={cx.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post) => {
            return <FeedPost key={post.id} post={post} />;
          })}
        </div>
        <Hidden only="xs">
          <div className={cx.sidebarContainer}>
            <div className={cx.sidebarWrapper}>
              <UserCard avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isFeedEnd && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
};

export default FeedPage;
