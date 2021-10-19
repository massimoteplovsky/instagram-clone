import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useFollowButtonStyles } from '../../styles';
import { UserContext } from '../../context';
import { useFollowUnfollow } from '../../hooks/useFollowUnfollow';

const FollowButton = ({ userId, side = false }) => {
  const cx = useFollowButtonStyles({ side });
  const { currentUser } = useContext(UserContext);
  const { handleFollowProfile, handleUnfollowProfile } = useFollowUnfollow(
    userId,
    currentUser.id
  );

  const isFollowing = currentUser.following.some(
    ({ profile_id }) => profile_id === userId
  );

  const followButton = (
    <Button
      variant={side ? 'text' : 'contained'}
      color="primary"
      className={cx.button}
      onClick={handleFollowProfile}
      fullWidth
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? 'text' : 'outlined'}
      className={cx.button}
      onClick={handleUnfollowProfile}
      fullWidth
    >
      Following
    </Button>
  );

  return isFollowing ? followingButton : followButton;
};

export default FollowButton;
