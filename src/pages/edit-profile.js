import React from 'react';
import { useEditProfilePageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import {
  IconButton,
  Button,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { defaultCurrentUser } from '../data';
import ProfilePicture from '../components/shared/ProfilePicture';

const EditProfilePage = ({ history }) => {
  const cx = useEditProfilePageStyles();
  const path = history.location.pathname;
  const [showDrawer, setDrawer] = React.useState(false);

  function handleToggleDrawer() {
    setDrawer((prev) => !prev);
  }

  function handleSelected(index) {
    switch (index) {
      case 0:
        return path.includes('edit');
      default:
        break;
    }
  }

  function handleListClick(index) {
    switch (index) {
      case 0:
        history.push('/accounts/edit');
        break;
      default:
        break;
    }
  }

  const options = [
    'Edit Profile',
    'Change Password',
    'Apps and Websites',
    'Email and SMS',
    'Push Notifications',
    'Manage Contacts',
    'Privacy and Security',
    'Login Activity',
    'Emails from Instagram',
  ];

  const drawer = (
    <List>
      {options.map((option, index) => (
        <ListItem
          key={option}
          button
          selected={handleSelected(index)}
          onClick={() => handleListClick(index)}
          classes={{
            selected: cx.listItemSelected,
            button: cx.listItemButton,
          }}
        >
          <ListItemText primary={option} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Layout title="Edit Profile">
      <section className={cx.section}>
        <IconButton
          edge="start"
          onClick={handleToggleDrawer}
          className={cx.menuButton}
        >
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={showDrawer}
              onClose={handleToggleDrawer}
              classes={{ paperAnchorLeft: cx.temporaryDrawer }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden
            xsDown
            implementation="css"
            className={cx.permanentDrawerRoot}
          >
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: cx.permanentDrawerPaper,
                root: cx.permanentDrawerRoot,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main>
          {path.includes('edit') && <EditUserInfo user={defaultCurrentUser} />}
        </main>
      </section>
    </Layout>
  );
};

const EditUserInfo = ({ user }) => {
  const cx = useEditProfilePageStyles();

  return (
    <section className={cx.container}>
      <div className={cx.pictureSectionItem}>
        <ProfilePicture size={38} user={user} />
        <div className={cx.justifySelfStart}>
          <Typography className={cx.typography}>{user.username}</Typography>
          <Typography
            color="primary"
            variant="body2"
            className={cx.typographyChangePic}
          >
            Change Profile Photo
          </Typography>
        </div>
      </div>
      <form className={cx.form}>
        <SectionItem text="Name" formItem={user.name} />
        <SectionItem text="Username" formItem={user.username} />
        <SectionItem text="Website" formItem={user.website} />
        <div className={cx.sectionItem}>
          <aside>
            <Typography className={cx.bio}>Bio</Typography>
          </aside>
          <TextField
            variant="outlined"
            multiline
            rowsMax={3}
            rows={3}
            fullWidth
            value={user.bio}
          />
        </div>
        <div className={cx.sectionItem}>
          <div />
          <Typography color="textSecondary" className={cx.justifySelfStart}>
            Personal information
          </Typography>
        </div>
        <SectionItem text="Email" formItem={user.email} type="email" />
        <SectionItem text="Phone Number" formItem={user.phone_number} />
        <div className={cx.sectionItem}>
          <div />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={cx.justifySelfStart}
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

function SectionItem({ type = 'text', text, formItem }) {
  const cx = useEditProfilePageStyles();

  return (
    <div className={cx.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={cx.typography} align="right">
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={cx.typography}>{text}</Typography>
        </Hidden>
      </aside>
      <TextField
        variant="outlined"
        fullWidth
        value={formItem}
        type={type}
        className={cx.textField}
        inputProps={{
          className: cx.textFieldInput,
        }}
      />
    </div>
  );
}

export default EditProfilePage;
