import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Zoom, Button, Divider } from '@material-ui/core';
import { useOptionsDialogStyles } from '../../styles';
import { Path } from '../../consts';
import { defaultPost } from '../../data';

const OptionsDialog = ({ onClose }) => {
  const cx = useOptionsDialogStyles();

  return (
    <Dialog
      open
      classes={{ scrollPaper: cx.dialogScrollPaper }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <Button className={cx.redButton}>Unfollow</Button>
      <Divider />
      <Button className={cx.button}>
        <Link to={Path.POST(defaultPost.id)}>Go to post</Link>
      </Button>
      <Divider />
      <Button className={cx.button}>Share</Button>
      <Divider />
      <Button className={cx.button}>Copy link</Button>
      <Divider />
      <Button onClick={onClose} className={cx.button}>
        Cancel
      </Button>
    </Dialog>
  );
};

export default OptionsDialog;
