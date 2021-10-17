import React from 'react';
import { Button } from '@material-ui/core';
import { useFollowButtonStyles } from '../../styles';

const FollowButton = ({ userId, side = false }) => {
  const cx = useFollowButtonStyles({ side });
  const [isFollowing, setFollowing] = React.useState(false);

  const followButton = (
    <Button
      variant={side ? 'text' : 'contained'}
      color="primary"
      className={cx.button}
      onClick={() => setFollowing(true)}
      fullWidth
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? 'text' : 'outlined'}
      className={cx.button}
      onClick={() => setFollowing(false)}
      fullWidth
    >
      Following
    </Button>
  );

  return isFollowing ? followingButton : followButton;
};

export default FollowButton;
