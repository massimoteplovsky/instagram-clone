import React from 'react';
import { Hidden, Typography } from '@material-ui/core';
import { useExploreSuggestionsStyles } from '../../styles';

// Components
import FollowSuggestions from '../shared/FollowSuggestions';

const ExploreSuggestions = () => {
  const cx = useExploreSuggestionsStyles();

  return (
    <Hidden xsDown>
      <div className={cx.container}>
        <Typography
          className={cx.typography}
          color="textSecondary"
          variant="subtitle2"
          component="h2"
        >
          Discover People
        </Typography>
        <FollowSuggestions headless={true} />
      </div>
    </Hidden>
  );
};

export default ExploreSuggestions;
