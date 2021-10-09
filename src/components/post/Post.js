import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostStyles } from '../../styles';
import {
  Typography,
  Button,
  Hidden,
  TextField,
  Divider,
} from '@material-ui/core';
import { defaultPost } from '../../data';

// Components
import UserCard from '../shared/UserCard';
import {
  MoreIcon,
  CommentIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
  SaveIcon,
  RemoveIcon,
} from '../../icons';
import OptionsDialog from '../shared/OptionsDialog';

const Post = ({ postId }) => {
  const cx = usePostStyles();
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);

  const { id, likes, caption, user, media, comments } = defaultPost;

  return (
    <div className={cx.postContainer}>
      <article className={cx.article}>
        <div className={cx.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon
            className={cx.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        <div className={cx.postImage}>
          <img src={media} alt="Post media" className={cx.image} />
        </div>
        <div className={cx.postButtonsWrapper}>
          <div className={cx.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={cx.likes} variant="subtitle2">
            <span>{likes === 1 ? '1 like' : `${likes} likes`}</span>
          </Typography>
          <div className={cx.postCaptionContainer}>
            <Typography
              className={cx.postCaption}
              variant="body2"
              component="span"
              dangerouslySetInnerHTML={{ __html: caption }}
            />
            {comments.length > 0 && (
              <>
                {comments.map(({ id, user, content }) => (
                  <div key={id}>
                    <Link to={`/${user.username}`}>
                      <Typography
                        className={cx.commentUsername}
                        variant="subtitle2"
                        component="span"
                      >
                        {user.username}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {content}
                      </Typography>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
          <Typography className={cx.datePosted} color="textSecondary">
            5 days ago
          </Typography>
          <Hidden only="xs">
            <div className={cx.comment}>
              <Divider />
              <CommentInput />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </div>
  );
};

const LikeButton = () => {
  const cx = usePostStyles();
  const [isLiked, setIsLiked] = useState(false);

  return isLiked ? (
    <UnlikeIcon className={cx.liked} onClick={() => setIsLiked(false)} />
  ) : (
    <LikeIcon className={cx.like} onClick={() => setIsLiked(true)} />
  );
};

const SaveButton = () => {
  const cx = usePostStyles();
  const [isSaved, setIsSaved] = useState(false);

  return isSaved ? (
    <RemoveIcon className={cx.saveIcon} onClick={() => setIsSaved(false)} />
  ) : (
    <SaveIcon className={cx.saveIcon} onClick={() => setIsSaved(true)} />
  );
};

const CommentInput = () => {
  const cx = usePostStyles();
  const [content, setContent] = useState('');

  return (
    <div className={cx.commentContainer}>
      <TextField
        className={cx.textField}
        fullWidth
        value={content}
        placeholder="Add comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={(event) => {
          setContent(event.target.value);
        }}
        InputProps={{
          classes: {
            root: cx.root,
            underline: cx.underline,
          },
        }}
      />
      <Button
        className={cx.commentButton}
        color="primary"
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
};

export default Post;
