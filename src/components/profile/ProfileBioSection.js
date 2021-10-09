import React from 'react';
import { Typography } from '@material-ui/core';
import { useProfilePageStyles } from '../../styles';

const ProfileBioSection = ({ user }) => {
  const cx = useProfilePageStyles();

  return (
    <section className={cx.section}>
      <Typography className={cx.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={cx.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
};

export default ProfileBioSection;
