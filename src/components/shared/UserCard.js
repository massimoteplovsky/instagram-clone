import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useUserCardStyles } from '../../styles';

import { defaultUser } from '../../data';

const UserCard = ({ user = defaultUser, avatarSize = 44, location }) => {
  const cx = useUserCardStyles({ avatarSize });
  const { name, username, profile_image } = user;

  return (
    <div className={cx.wrapper}>
      <Link to={`/${username}`}>
        <Avatar src={profile_image} alt="User Avatar" className={cx.avatar} />
      </Link>
      <div className={cx.nameWrapper}>
        <Link to={`/${username}`}>
          <Typography variant="subtitle2" className={cx.typography}>
            {username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={cx.typography}
        >
          {location || name}
        </Typography>
      </div>
    </div>
  );
};

export default UserCard;
