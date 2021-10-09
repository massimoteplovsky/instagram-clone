import React, { useState } from 'react';
import { Hidden, Card, CardContent } from '@material-ui/core';
import { useProfilePageStyles } from '../styles';
import { defaultCurrentUser as user } from '../data';

// Components
import Layout from '../components/shared/Layout';
import ProfilePicture from '../components/shared/ProfilePicture';
import ProfileNameSection from '../components/profile/ProfileNameSection';
import ProfileCountSection from '../components/profile/ProfileCountSection';
import ProfileBioSection from '../components/profile/ProfileBioSection';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileOptionsMenu from '../components/profile/ProfileOptionsMenu';

const ProfilePage = () => {
  const cx = useProfilePageStyles();
  const [showDialogOptions, setShowDialogOptions] = useState(false);
  const isOwner = true;
  const {
    id,
    username,
    name,
    profile_image,
    website,
    email,
    bio,
    phone_number,
    posts,
    followers,
    following,
  } = user;

  return (
    <Layout title={`${name} (@${username})`}>
      <div className={cx.container}>
        <Hidden xsDown>
          <Card className={cx.cardLarge}>
            <ProfilePicture isOwner={true} />
            <CardContent className={cx.cardContentLarge}>
              <ProfileNameSection
                user={user}
                isOwner={true}
                handleDialogOptions={() => setShowDialogOptions(true)}
              />
              <ProfileCountSection user={user} />
              <ProfileBioSection user={user} />
            </CardContent>
          </Card>
        </Hidden>

        <Hidden smUp>
          <Card className={cx.cardSmall}>
            <CardContent>
              <section className={cx.sectionSmall}>
                <ProfilePicture size={77} isOwner={true} />
                <ProfileNameSection
                  user={user}
                  isOwner={true}
                  handleDialogOptions={() => setShowDialogOptions(true)}
                />
              </section>
              <ProfileBioSection user={user} />
            </CardContent>
            <ProfileCountSection user={user} />
          </Card>
        </Hidden>
        {showDialogOptions && (
          <ProfileOptionsMenu
            handleCloseMenu={() => setShowDialogOptions(false)}
          />
        )}
        <ProfileTabs user={user} isOwner={isOwner} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
