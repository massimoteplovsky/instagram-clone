import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useFeedSideSuggestionsStyles } from '../../styles';
import { getDefaultUser } from '../../data';

// Components
import UserCard from '../shared/UserCard';
import FollowButton from '../shared/FollowButton';
import { LoadingIcon } from '../../icons';

function FeedSideSuggestions() {
  const cx = useFeedSideSuggestionsStyles();

  const loading = false;

  return (
    <article className={cx.article}>
      <Paper className={cx.paper}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          align="left"
          gutterBottom
          className={cx.typography}
        >
          Suggestions for you
        </Typography>
        {loading ? (
          <LoadingIcon />
        ) : (
          Array.from({ length: 5 }, () => getDefaultUser()).map((user) => (
            <div key={user.id} className={cx.card}>
              <UserCard user={user} />
              <FollowButton side />
            </div>
          ))
        )}
      </Paper>
    </article>
  );
}

export default FeedSideSuggestions;
