import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from '@material-ui/core';
import { Path } from '../../consts';
import { useFollowSuggestionsStyles } from '../../styles';

// Components
import FollowButton from './FollowButton';

const FollowSuggestionItem = ({ user }) => {
  const cx = useFollowSuggestionsStyles();
  const { profile_image, name, username } = user;
  return (
    <div>
      <div className={cx.card}>
        <Link to={Path.ACCOUNT(username)}>
          <Avatar
            src={profile_image}
            alt={`${username}'s avatar'`}
            classes={{ root: cx.avatar, img: cx.avatarImg }}
          />
        </Link>
        <Link to={Path.ACCOUNT(username)}>
          <Typography className={cx.text} align="center" variant="subtitle2">
            {username}
          </Typography>
        </Link>
        <Typography
          className={cx.text}
          color="textSecondary"
          align="center"
          variant="body2"
        >
          {name}
        </Typography>
        <FollowButton userId={user.id} />
      </div>
    </div>
  );
};

export default FollowSuggestionItem;
