import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  Zoom,
  Button,
  Divider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useProfilePageStyles } from '../../styles';
import { AuthContext } from '../../auth';
import { Path } from '../../consts';

const ProfileOptionsMenu = ({ handleCloseMenu }) => {
  const cx = useProfilePageStyles();
  const history = useHistory();
  const { signOut } = useContext(AuthContext);
  const [showLogOutMessage, setLogOutMessage] = useState(false);

  const handleLogOutClick = () => {
    setLogOutMessage(true);
    setTimeout(() => {
      signOut();
      history.push(Path.LOGIN);
    }, 2000);
  };

  return (
    <Dialog
      open
      onClose={handleCloseMenu}
      classes={{
        scrollPaper: cx.dialogScrollPaper,
        paper: cx.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className={cx.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continue using Instagram.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
};

const OptionsItem = ({ text, onClick }) => {
  return (
    <>
      <Button style={{ padding: '12px 8px' }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
};

export default ProfileOptionsMenu;
