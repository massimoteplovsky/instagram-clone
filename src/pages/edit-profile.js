import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Snackbar,
  Slide,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { AuthContext, UserContext } from '../context';
import { useMutation } from '@apollo/react-hooks';
import { EDIT_PROFILE, EDIT_USER_AVATAR } from '../graphql/mutations';
import { Path } from '../consts';

// Component
import ProfilePicture from '../components/shared/ProfilePicture';
import { handleImageUpload } from '../utils/imageUpload';

const EditProfilePage = ({ history }) => {
  const cx = useEditProfilePageStyles();
  const { currentUser } = useContext(UserContext);
  const path = history.location.pathname;
  const [showDrawer, setDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setDrawer((prev) => !prev);
  };

  const handleSelected = (index) => {
    switch (index) {
      case 0:
        return path.includes('edit');
      default:
        break;
    }
  };

  const handleListClick = (index) => {
    switch (index) {
      case 0:
        return history.push(Path.EDIT);
      default:
        break;
    }
  };

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
          {path.includes('edit') && <EditUserInfo user={currentUser} />}
        </main>
      </section>
    </Layout>
  );
};

const EditUserInfo = ({ user }) => {
  const cx = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const [formError, setFormError] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editProfile] = useMutation(EDIT_PROFILE);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
  const { updateEmail } = useContext(AuthContext);

  const onSubmit = async (formData) => {
    try {
      setFormError(null);
      const variables = { ...formData, id: user.id };
      await updateEmail(formData.email);
      await editProfile({ variables });
      setPopupVisible(true);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    if (error.message.includes('users_username_key')) {
      return setFormError({
        field: 'username',
        msg: 'Username is already taken',
      });
    }

    setFormError({
      field: 'email',
      msg: error.message,
    });
  };

  const handleUploadAvatar = async (event) => {
    const url = await handleImageUpload(event.target.files[0]);
    const variables = { profileImage: url, id: user.id };
    await editUserAvatar({ variables });
    setPopupVisible(true);
  };

  return (
    <section className={cx.container}>
      <div className={cx.pictureSectionItem}>
        <ProfilePicture size={38} image={user.profile_image} />
        <div className={cx.justifySelfStart}>
          <Typography className={cx.typography}>{user.username}</Typography>
          <input
            type="file"
            accept="image/*"
            id="image"
            style={{ display: 'none' }}
            onChange={handleUploadAvatar}
          />
          <label htmlFor="image">
            <Typography
              color="primary"
              variant="body2"
              className={cx.typographyChangePic}
            >
              Change Profile Photo
            </Typography>
          </label>
        </div>
      </div>
      <form className={cx.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionItem
          require={{
            ...register('name', {
              required: true,
              minLength: 5,
              maxLength: 20,
            }),
          }}
          text="Name"
          formItem={user.name}
        />
        <SectionItem
          error={formError}
          name="username"
          require={{
            ...register('username', {
              required: true,
              minLength: 5,
              maxLength: 20,
              pattern: /^[a-zA-Z0-9_.]*$/,
            }),
          }}
          text="Username"
          formItem={user.username}
        />
        <SectionItem
          require={{
            ...register('website', {
              validate: (value) =>
                Boolean(value)
                  ? isURL(value, {
                      protocols: ['http', 'https'],
                      require_protocol: true,
                    })
                  : true,
            }),
          }}
          text="Website"
          formItem={user.website}
        />
        <div className={cx.sectionItem}>
          <aside>
            <Typography className={cx.bio}>Bio</Typography>
          </aside>
          <TextField
            variant="outlined"
            {...register('bio', { maxLength: 120 })}
            multiline
            rowsMax={3}
            rows={3}
            fullWidth
            defaultValue={user.bio}
          />
        </div>
        <div className={cx.sectionItem}>
          <div />
          <Typography color="textSecondary" className={cx.justifySelfStart}>
            Personal information
          </Typography>
        </div>
        <SectionItem
          require={{
            ...register('email', {
              required: true,
              validate: (value) => isEmail(value),
            }),
          }}
          name="email"
          error={formError}
          text="Email"
          formItem={user.email}
          type="email"
        />
        <SectionItem
          require={{
            ...register('phoneNumber', {
              validate: (value) =>
                Boolean(value) ? isMobilePhone(value) : true,
            }),
          }}
          text="Phone Number"
          formItem={user.phone_number}
        />
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
      <Snackbar
        open={isPopupVisible}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        message={<span>Profile updated</span>}
        onClose={() => setPopupVisible(false)}
      />
    </section>
  );
};

function SectionItem({ type = 'text', text, formItem, require, name, error }) {
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
        name
        helperText={error && error.field === name ? error.msg : ''}
        defaultValue={formItem}
        type={type}
        {...require}
        className={cx.textField}
        inputProps={{
          className: cx.textFieldInput,
        }}
      />
    </div>
  );
}

export default EditProfilePage;
