import React from 'react';
import { Typography } from '@material-ui/core';
import { useExploreGridStyles } from '../../styles';
import { getDefaultPost } from '../../data';

// Components
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';

const ExploreGrid = () => {
  const cx = useExploreGridStyles();

  const loading = false;

  return (
    <>
      <Typography
        color="textSecondary"
        component="h2"
        variant="subtitle2"
        gutterBottom
        className={cx.typography}
      >
        Explore
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={cx.article}>
          <div className={cx.postContainer}>
            {Array.from({ length: 20 }, () => getDefaultPost()).map((post) => {
              return <GridPost key={post.id} post={post} />;
            })}
          </div>
        </article>
      )}
    </>
  );
};

export default ExploreGrid;
