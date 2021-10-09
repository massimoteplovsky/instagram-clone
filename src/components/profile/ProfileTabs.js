import React, { useState } from 'react';
import { useProfileTabsStyles } from '../../styles';
import { Divider, Tabs, Tab, Hidden, Typography } from '@material-ui/core';
import { GridIcon, SaveIcon } from '../../icons';
import GridPost from '../shared/GridPost';

const ProfileTabs = ({ user, isOwner }) => {
  const cx = useProfileTabsStyles();
  const [value, setValue] = useState(0);

  return (
    <>
      <section className={cx.section}>
        <Hidden xsDown>
          <Divider />
        </Hidden>
        <Hidden xsDown>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            classes={{ indicator: cx.tabsIndicator }}
          >
            <Tab
              icon={<span className={cx.postsIconLarge} />}
              label="POSTS"
              classes={{
                root: cx.tabRoot,
                labelIcon: cx.tabLabelIcon,
                wrapper: cx.tabWrapper,
              }}
            />
            {isOwner && (
              <Tab
                icon={<span className={cx.savedIconLarge} />}
                label="SAVED"
                classes={{
                  root: cx.tabRoot,
                  labelIcon: cx.tabLabelIcon,
                  wrapper: cx.tabWrapper,
                }}
              />
            )}
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            className={cx.tabs}
            classes={{ indicator: cx.tabsIndicator }}
          >
            <Tab
              icon={<GridIcon fill={value === 0 ? '#3897f0' : undefined} />}
              classes={{ root: cx.tabRoot }}
            />
            {isOwner && (
              <Tab
                icon={<SaveIcon fill={value === 1 ? '#3897f0' : undefined} />}
                classes={{ root: cx.tabRoot }}
              />
            )}
          </Tabs>
        </Hidden>
        <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
        {value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
        {value === 1 && <SavedPosts />}
      </section>
    </>
  );
};

const ProfilePosts = ({ user, isOwner }) => {
  const cx = useProfileTabsStyles();

  if (user.posts.length === 0) {
    return (
      <section className={cx.profilePostsSection}>
        <div className={cx.noContent}>
          <div className={cx.uploadPhotoIcon} />
          <Typography variant="h4">
            {isOwner ? 'Upload a Photo' : 'No Photos'}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <article className={cx.article}>
      <div className={cx.postContainer}>
        {user.posts.map((post) => (
          <GridPost key={post.id} post={post} />
        ))}
      </div>
    </article>
  );
};

const SavedPosts = () => {
  const cx = useProfileTabsStyles();

  return (
    <section className={cx.savedPostsSection}>
      <div className={cx.noContent}>
        <div className={cx.savePhotoIcon} />
        <Typography variant="h4">Save</Typography>
        <Typography align="center">
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </Typography>
      </div>
    </section>
  );
};

export default ProfileTabs;
