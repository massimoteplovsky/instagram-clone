import React from 'react';
import { usePostSkeletonStyles } from '../../styles';
import { useMediaQuery } from '@material-ui/core';

const PostSkeleton = () => {
  const cx = usePostSkeletonStyles();
  const matches = useMediaQuery('(min-width: 900px)');

  return (
    <div
      className={cx.container}
      style={{
        gridTemplateColumns: matches && '600px 335px',
      }}
    >
      <div className={cx.mediaSkeleton} />
      <div>
        <div className={cx.headerSkeleton}>
          <div className={cx.avatarSkeleton} />
          <div className={cx.headerTextSkeleton}>
            <div className={cx.primaryTextSkeleton} />
            <div className={cx.secondaryTextSkeleton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
