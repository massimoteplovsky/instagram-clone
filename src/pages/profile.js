import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { Hidden, Card, CardContent } from '@material-ui/core';
import { useProfilePageStyles } from '../styles';
import { GET_PROFILE } from '../graphql/subscriptions';
import { UserContext } from '../context';

// Components
import Layout from '../components/shared/Layout';
import ProfilePicture from '../components/shared/ProfilePicture';
import ProfileNameSection from '../components/profile/ProfileNameSection';
import ProfileCountSection from '../components/profile/ProfileCountSection';
import ProfileBioSection from '../components/profile/ProfileBioSection';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileOptionsMenu from '../components/profile/ProfileOptionsMenu';
import LoadingScreen from '../components/shared/LoadingScreen';

const ProfilePage = () => {
  const cx = useProfilePageStyles();
  const { currentUser } = useContext(UserContext);
  const { username } = useParams();
  const [showDialogOptions, setShowDialogOptions] = useState(false);
  const { data, loading } = useSubscription(GET_PROFILE, {
    variables: { username },
  });

  if (loading) return <LoadingScreen />;

  const [profile] = data.users;
  const { id, name, profile_image, followers, following } = profile;
  const isOwner = currentUser.id === id;

  const checkFollowingFollowers = (arr) => {
    return arr.some(({ user }) => user.id === currentUser.id);
  };

  console.log(data.users[0], 'Profile Page');

  return (
    <Layout title={`${name} (@${username})`}>
      <div className={cx.container}>
        <Hidden xsDown>
          <Card className={cx.cardLarge}>
            <ProfilePicture isOwner={isOwner} image={profile_image} />
            <CardContent className={cx.cardContentLarge}>
              <ProfileNameSection
                user={profile}
                isFollowing={checkFollowingFollowers(followers)}
                isFollower={checkFollowingFollowers(following)}
                isOwner={isOwner}
                handleDialogOptions={() => setShowDialogOptions(true)}
              />
              <ProfileCountSection user={profile} />
              <ProfileBioSection user={profile} />
            </CardContent>
          </Card>
        </Hidden>

        <Hidden smUp>
          <Card className={cx.cardSmall}>
            <CardContent>
              <section className={cx.sectionSmall}>
                <ProfilePicture size={77} isOwner={true} />
                <ProfileNameSection
                  user={profile}
                  isFollowing={checkFollowingFollowers(following)}
                  isFollower={checkFollowingFollowers(followers)}
                  isOwner={isOwner}
                  handleDialogOptions={() => setShowDialogOptions(true)}
                />
              </section>
              <ProfileBioSection user={profile} />
            </CardContent>
            <ProfileCountSection user={profile} />
          </Card>
        </Hidden>
        {showDialogOptions && (
          <ProfileOptionsMenu
            handleCloseMenu={() => setShowDialogOptions(false)}
          />
        )}
        <ProfileTabs user={profile} isOwner={isOwner} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
