import React, { useMemo, useState, useContext } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useMutation } from '@apollo/react-hooks';
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { ArrowBackIos, PinDrop } from '@material-ui/icons';
import { UserContext } from '../../context';
import { serialize } from '../../utils/serialize';
import { handleImageUpload } from '../../utils/imageUpload';
import { CREATE_POST } from '../../graphql/mutations';
import { useAddPostDialogStyles } from '../../styles';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const AddPostDialog = ({ media, user, onClose }) => {
  const cx = useAddPostDialogStyles();

  const editor = useMemo(() => withReact(createEditor()), []);
  const [location, setLocation] = React.useState('');
  const [value, setValue] = useState(initialValue);
  const [submitting, setSubmitting] = React.useState(false);
  const [createPost] = useMutation(CREATE_POST);

  const handleSharePost = async () => {
    setSubmitting(true);
    const url = await handleImageUpload(media);
    const variables = {
      image: url,
      location,
      userId: user.id,
      caption: serialize({ children: value }),
    };
    await createPost({ variables });
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog fullScreen open onClose={onClose}>
      <AppBar className={cx.appBar}>
        <Toolbar className={cx.toolbar}>
          <ArrowBackIos onClick={onClose} />
          <Typography align="center" variant="body1" className={cx.title}>
            New Post
          </Typography>
          <Button
            color="primary"
            className={cx.share}
            disabled={submitting}
            onClick={handleSharePost}
          >
            Share
          </Button>
        </Toolbar>
      </AppBar>
      <Divider />
      <Paper className={cx.paper}>
        <Avatar src={user.profile_image} />
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable className={cx.editor} placeholder="Write your caption..." />
        </Slate>
        <Avatar
          src={URL.createObjectURL(media)}
          className={cx.avatarLarge}
          variant="square"
        />
      </Paper>
      <TextField
        fullWidth
        placeholder="Location"
        InputProps={{
          classes: {
            root: cx.root,
            input: cx.input,
            underline: cx.underline,
          },
          startAdornment: (
            <InputAdornment>
              <PinDrop />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setLocation(event.target.value)}
      />
    </Dialog>
  );
};

export default AddPostDialog;
