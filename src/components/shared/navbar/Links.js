import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hidden, Avatar } from '@material-ui/core';
import { useNavbarStyles, RedTooltip } from '../../../styles';
import { Path } from '../../../consts';
import { defaultCurrentUser } from '../../../data';

// Components
import {
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon,
} from '../../../icons';
import NotificationTooltip from '../../notification/NotificationTooltip';
import NotificationList from '../../notification/NotificationList';

const Links = ({ path }) => {
  const cx = useNavbarStyles();
  const [showList, setShowList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowTooltip(false), 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleToggleShowList = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  return (
    <div className={cx.linksContainer}>
      {showList && (
        <NotificationList handleHideList={() => setShowList(false)} />
      )}
      <div className={cx.linksWrapper}>
        <Hidden xsUp>
          <AddIcon />
        </Hidden>
        <Link to={Path.DASHBOARD}>
          {path === Path.DASHBOARD ? <HomeActiveIcon /> : <HomeIcon />}
        </Link>
        <Link to={Path.EXPLORE}>
          {path === Path.EXPLORE ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={() => setShowTooltip(false)}
          title={<NotificationTooltip />}
        >
          <div className={cx.notifications} onClick={handleToggleShowList}>
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={Path.ACCOUNT(defaultCurrentUser.username)}>
          <div
            className={
              path === Path.ACCOUNT(defaultCurrentUser.username)
                ? cx.profileActive
                : ''
            }
          ></div>
          <Avatar
            src={defaultCurrentUser.profile_image}
            className={cx.profileImage}
          />
        </Link>
      </div>
    </div>
  );
};

export default Links;
