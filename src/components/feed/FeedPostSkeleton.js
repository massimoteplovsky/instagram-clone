import React from 'react';
import { useFeedPostSkeletonStyles } from '../../styles';

const FeedPostSkeleton = () => {
  const cx = useFeedPostSkeletonStyles();

  return (
    <div className={cx.container}>
      <div className={cx.headerSkeleton}>
        <div className={cx.avatarSkeleton} />
        <div className={cx.headerTextSkeleton}>
          <div className={cx.primaryTextSkeleton} />
          <div className={cx.secondaryTextSkeleton} />
        </div>
      </div>
      <div className={cx.mediaSkeleton} />
    </div>
  );
};

export default FeedPostSkeleton;
