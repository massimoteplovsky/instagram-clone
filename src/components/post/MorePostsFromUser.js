import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useMorePostsFromUserStyles } from '../../styles';
import { getDefaultPost, defaultUser } from '../../data';

// Components
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';
import { Path } from '../../consts';

const MorePostsFromUser = () => {
  const cx = useMorePostsFromUserStyles();

  const loading = false;

  return (
    <div className={cx.container}>
      <Typography
        color="textSecondary"
        component="h2"
        variant="subtitle2"
        gutterBottom
        className={cx.typography}
      >
        More post from{' '}
        <Link to={Path.ACCOUNT(defaultUser.username)} className={cx.link}>
          {defaultUser.username}
        </Link>
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={cx.article}>
          <div className={cx.postContainer}>
            {Array.from({ length: 10 }, () => getDefaultPost()).map((post) => {
              return <GridPost key={post.id} post={post} />;
            })}
          </div>
        </article>
      )}
    </div>
  );
};

export default MorePostsFromUser;
