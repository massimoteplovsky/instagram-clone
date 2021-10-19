import React, { useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import useOutsideClick from '@rooks/use-outside-click';
import { useNotificationListStyles } from '../../styles';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Path } from '../../consts';
import { formatDateToNowShort } from '../../utils/formatDate';

// Components
import FollowButton from '../shared/FollowButton';
import { CHECK_NOTIFICATIONS } from '../../graphql/mutations';

const NotificationList = ({
  handleHideList,
  notifications,
  currentUserId,
  hasNotifications,
}) => {
  const cx = useNotificationListStyles();
  const listContainerRef = useRef();

  console.log(notifications);

  useOutsideClick(listContainerRef, handleHideList);
  const [checkNotifications] = useMutation(CHECK_NOTIFICATIONS);

  useEffect(() => {
    if (hasNotifications) {
      const variables = {
        userId: currentUserId,
        lastChecked: new Date().toISOString(),
      };
      checkNotifications({ variables });
    }
  }, [currentUserId, checkNotifications, hasNotifications]);

  return (
    <Grid ref={listContainerRef} className={cx.listContainer} container>
      {notifications.map((notification) => {
        const isLike = notification.type === 'like';
        const isFollow = notification.type === 'follow';
        const isComment = notification.type === 'comment';

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
                  {isLike &&
                    `likes your photo. ${formatDateToNowShort(
                      notification.created_at
                    )}`}
                  {isFollow &&
                    `started following you. ${formatDateToNowShort(
                      notification.created_at
                    )}`}
                  {isComment &&
                    `commented your post. ${formatDateToNowShort(
                      notification.created_at
                    )}`}
                </Typography>
              </div>
            </div>
            <div>
              {(isLike || isComment) && (
                <Link to={Path.POST(notification.post.id)}>
                  <Avatar src={notification.post.image} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton userId={notification.user.id} />}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NotificationList;
