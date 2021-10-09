import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useGridPostStyles } from '../../styles';
import { Path } from '../../consts';

const GridPost = ({ post }) => {
  const cx = useGridPostStyles();
  const history = useHistory();

  const handleOpenPost = () => {
    history.push({
      pathname: Path.POST(post.id),
      state: { modal: true },
    });
  };

  return (
    <div onClick={handleOpenPost} className={cx.gridPostContainer}>
      <div className={cx.gridPostOverlay}>
        <div className={cx.gridPostInfo}>
          <span className={cx.likes}></span>
          <Typography>{post.likes}</Typography>
        </div>
        <div className={cx.gridPostInfo}>
          <span className={cx.comments}></span>
          <Typography>{post.comments.length}</Typography>
        </div>
      </div>
      <img src={post.media} alt="Post cover" className={cx.image} />
    </div>
  );
};

export default GridPost;
