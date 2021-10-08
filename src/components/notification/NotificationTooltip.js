import React from 'react';
import { Typography } from '@material-ui/core';
import { useNavbarStyles } from '../../styles';

function NotificationTooltip() {
  const cx = useNavbarStyles();

  return (
    <div className={cx.tooltipContainer}>
      <div className={cx.tooltip}>
        <span aria-label="Followers" className={cx.followers} />
        <Typography>1</Typography>
      </div>
      <div className={cx.tooltip}>
        <span aria-label="Likes" className={cx.likes} />
        <Typography>1</Typography>
      </div>
    </div>
  );
}

export default NotificationTooltip;
