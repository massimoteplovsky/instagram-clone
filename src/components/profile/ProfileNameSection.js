import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Hidden,
  Typography,
  Divider,
  Dialog,
  Zoom,
  Avatar,
} from '@material-ui/core';
import { useProfilePageStyles } from '../../styles';
import { Path } from '../../consts';
import { useMutation } from '@apollo/react-hooks';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '../../graphql/mutations';
import { UserContext } from '../../context';
import { useFollowUnfollow } from '../../hooks/useFollowUnfollow';

// Components
import { GearIcon } from '../../icons';

const ProfileNameSection = ({
  user,
  isOwner,
  isFollowing,
  isFollower,
  handleDialogOptions,
}) => {
  const cx = useProfilePageStyles();
  const { currentUser } = useContext(UserContext);
  const [showUnfollowDialog, setUnfollowDialog] = useState(false);
  const { handleFollowProfile, handleUnfollowProfile } = useFollowUnfollow(
    user.id,
    currentUser.id
  );

  let followButton;

  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setUnfollowDialog(true)}
        variant="outlined"
        className={cx.button}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button
        onClick={handleFollowProfile}
        variant="contained"
        color="primary"
        className={cx.button}
      >
        Follow back
      </Button>
    );
  } else {
    followButton = (
      <Button
        onClick={handleFollowProfile}
        variant="contained"
        color="primary"
        className={cx.button}
      >
        Follow
      </Button>
    );
  }

  return (
    <>
      <Hidden xsDown>
        <section className={cx.usernameSection}>
          <Typography className={cx.username}>{user.username}</Typography>
          {isOwner ? (
            <>
              <Link to={Path.EDIT}>
                <Button variant="outlined">Edit Profile</Button>
              </Link>
              <div onClick={handleDialogOptions} className={cx.settingsWrapper}>
                <GearIcon className={cx.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={cx.usernameDivSmall}>
            <Typography className={cx.username}>{user.username}</Typography>
            {isOwner && (
              <div onClick={handleDialogOptions} className={cx.settingsWrapper}>
                <GearIcon className={cx.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to={Path.EDIT}>
              <Button variant="outlined" style={{ width: '100%' }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <UnfollowDialog
          user={user}
          handleUnfollowProfile={handleUnfollowProfile}
          onClose={() => setUnfollowDialog(false)}
        />
      )}
    </>
  );
};

const UnfollowDialog = ({ onClose, handleUnfollowProfile, user }) => {
  const cx = useProfilePageStyles();

  const onUnfollow = () => {
    handleUnfollowProfile();
    onClose();
  };

  return (
    <Dialog
      open
      classes={{
        scrollPaper: cx.unfollowDialogScrollPaper,
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <div className={cx.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={cx.avatar}
        />
      </div>
      <Typography
        align="center"
        variant="body2"
        className={cx.unfollowDialogText}
      >
        Unfollow @{user.username}?
      </Typography>
      <Divider />
      <Button className={cx.unfollowButton} onClick={onUnfollow}>
        Unfollow
      </Button>
      <Divider />
      <Button onClick={onClose} className={cx.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
};

export default ProfileNameSection;
