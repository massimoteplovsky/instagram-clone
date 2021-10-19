import { useMutation } from '@apollo/react-hooks';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '../graphql/mutations';

export const useFollowUnfollow = (userIdToFollow, currentUserId) => {
  const [followProfile] = useMutation(FOLLOW_PROFILE);
  const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE);
  const variables = {
    userIdToFollow,
    currentUserId,
  };

  const handleFollowProfile = () => {
    followProfile({ variables });
  };

  const handleUnfollowProfile = () => {
    unfollowProfile({ variables });
  };

  return { handleFollowProfile, handleUnfollowProfile };
};
