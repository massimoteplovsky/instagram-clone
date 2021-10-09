import React from 'react';
import { Hidden, Typography, Divider } from '@material-ui/core';
import { useProfilePageStyles } from '../../styles';

const ProfileCountSection = ({ user }) => {
  const cx = useProfilePageStyles();
  const options = ['posts', 'followers', 'following'];

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={cx.followingSection}>
        {options.map((option) => (
          <div key={option} className={cx.followingText}>
            <Typography className={cx.followingCount}>
              {user[option].length}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color="textSecondary">{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
};

export default ProfileCountSection;
