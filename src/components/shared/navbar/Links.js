import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { isAfter } from 'date-fns';
import { Hidden, Avatar } from '@material-ui/core';
import { useNavbarStyles, RedTooltip } from '../../../styles';
import { Path } from '../../../consts';

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
import { UserContext } from '../../../context';

// Components
import NotificationTooltip from '../../notification/NotificationTooltip';
import NotificationList from '../../notification/NotificationList';
import AddPostDialog from '../../post/AddPostDialog';

const Links = ({ path }) => {
  const cx = useNavbarStyles();
  const inputRef = useRef();
  const { currentUser } = useContext(UserContext);
  const newNotifications = currentUser.notifications.filter(
    ({ created_at }) => {
      return isAfter(new Date(created_at), new Date(currentUser.last_checked));
    }
  );
  const hasNotifications = newNotifications.length > 0;
  const [showList, setShowList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(hasNotifications);
  const [media, setMedia] = useState(null);
  const [showPostDialog, setShowPostDialog] = useState(false);

  useEffect(() => {
    setShowTooltip(hasNotifications);
  }, [hasNotifications]);

  const handleToggleShowList = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  const handleAddPost = (event) => {
    setShowPostDialog(true);
    setMedia(event.target.files[0]);
  };

  return (
    <div className={cx.linksContainer}>
      {showList && (
        <NotificationList
          notifications={currentUser.notifications}
          currentUserId={currentUser.id}
          handleHideList={() => setShowList(false)}
          hasNotifications={hasNotifications}
        />
      )}
      <div className={cx.linksWrapper}>
        {showPostDialog && (
          <AddPostDialog
            media={media}
            user={currentUser}
            onClose={() => setShowPostDialog(false)}
          />
        )}
        <Hidden xsDown>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={handleAddPost}
          />
          <AddIcon onClick={() => inputRef.current.click()} />
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
          title={<NotificationTooltip notifications={newNotifications} />}
        >
          <div
            className={hasNotifications ? cx.notifications : ''}
            onClick={handleToggleShowList}
          >
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={Path.ACCOUNT(currentUser.username)}>
          <div
            className={
              path === Path.ACCOUNT(currentUser.username)
                ? cx.profileActive
                : ''
            }
          ></div>
          <Avatar src={currentUser.profile_image} className={cx.profileImage} />
        </Link>
      </div>
    </div>
  );
};

export default Links;
