import React, { useState, lazy, Suspense } from 'react';
import { Hidden } from '@material-ui/core';
import { useFeedPageStyles } from '../styles';
import { getDefaultPost } from '../data';

// Components
import Layout from '../components/shared/Layout';
// import FeedPost from '../components/feed/FeedPost';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
import UserCard from '../components/shared/UserCard';
import LoadingScreen from '../components/shared/LoadingScreen';
import FollowSuggestions from '../components/shared/FollowSuggestions';
import { LoadingLargeIcon } from '../icons';
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
const FeedPost = lazy(() => import('../components/feed/FeedPost'));

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
          {Array.from({ length: 5 }, () => getDefaultPost()).map(
            (post, index) => {
              if (index === 2) {
                return <FollowSuggestions key={index} />;
              }
              return (
                <Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                  <FeedPost post={post} />
                </Suspense>
              );
            }
          )}
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
