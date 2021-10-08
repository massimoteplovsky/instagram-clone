import React from 'react';
import useOutsideClick from '@rooks/use-outside-click';
import { useNotificationListStyles } from '../../styles';
import { defaultNotifications } from '../../data';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Path } from '../../consts';

// Components
import FollowButton from '../shared/FollowButton';

function NotificationList({ handleHideList }) {
  const cx = useNotificationListStyles();
  const listContainerRef = React.useRef();

  useOutsideClick(listContainerRef, handleHideList);

  return (
    <Grid ref={listContainerRef} className={cx.listContainer} container>
      {defaultNotifications.map((notification) => {
        const isLike = notification.type === 'like';
        const isFollow = notification.type === 'follow';

        return (
          <Grid key={notification.id} item className={cx.listItem}>
            <div className={cx.listItemWrapper}>
              <div className={cx.avatarWrapper}>
                <Avatar
                  src={notification.user.profile_image}
                  alt="User avatar"
                />
              </div>
              <div className={cx.nameWrapper}>
                <Link to={Path.ACCOUNT(notification.user.username)}>
                  <Typography variant="body1">
                    {notification.user.username}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={cx.typography}
                >
                  {isLike && `likes your photo. 4d`}
                  {isFollow && `started following you. 5d`}
                </Typography>
              </div>
            </div>
            <div>
              {isLike && (
                <Link to={Path.POST(notification.post.id)}>
                  <Avatar src={notification.post.media} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton />}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default NotificationList;
