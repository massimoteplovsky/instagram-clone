import React from 'react';
import { Typography } from '@material-ui/core';
import { useNavbarStyles } from '../../styles';

const NotificationTooltip = ({ notifications }) => {
  const cx = useNavbarStyles();
  const {
    like: likeCount = 0,
    follow: followCount = 0,
    comment: commentCount = 0,
  } = notifications.reduce((acc, { type }) => {
    if (!acc[type]) {
      acc[type] = 1;
      return acc;
    }

    acc[type] += 1;
    return acc;
  }, {});

  return (
    <div className={cx.tooltipContainer}>
      {followCount > 0 && (
        <div className={cx.tooltip}>
          <span aria-label="Followers" className={cx.followers} />
          <Typography>{followCount}</Typography>
        </div>
      )}
      {likeCount > 0 && (
        <div className={cx.tooltip}>
          <span aria-label="Likes" className={cx.likes} />
          <Typography>{likeCount}</Typography>
        </div>
      )}
      {commentCount > 0 && (
        <div className={cx.tooltip}>
          <span aria-label="Comments" className={cx.comments} />
          <Typography>{commentCount}</Typography>
        </div>
      )}
    </div>
  );
};

export default NotificationTooltip;
