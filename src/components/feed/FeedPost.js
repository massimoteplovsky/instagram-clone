import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFeedPostStyles } from '../../styles';
import { Typography, Button, Hidden, TextField } from '@material-ui/core';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

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

const FeedPost = ({ post }) => {
  const cx = useFeedPostStyles();
  const [showCaption, setShowCaption] = useState(false);
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);

  const { id, likes, caption, user, media, comments } = post;

  return (
    <>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
      <article className={cx.article}>
        <div className={cx.postHeader}>
          <UserCard user={user} />
          <MoreIcon
            className={cx.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        <div>
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
          <div className={showCaption ? cx.expanded : cx.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography
                className={cx.username}
                variant="subtitle2"
                component="span"
              >
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                dangerouslySetInnerHTML={{ __html: caption }}
                variant="body2"
                component="span"
              />
            ) : (
              <div className={cx.captionWrapper}>
                <HTMLEllipsis
                  className={cx.caption}
                  unsafeHTML={caption}
                  maxLine="0"
                  ellipsis="..."
                  basedOn="letters"
                />
                <Button
                  className={cx.moreButton}
                  onClick={() => setShowCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
          </div>
          {comments.length > 0 && (
            <>
              <Link to={`/p/${id}`}>
                <Typography
                  className={cx.commentsLink}
                  variant="body2"
                  component="div"
                >
                  View all {comments.length} comments
                </Typography>
              </Link>
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
          <Typography className={cx.datePosted} color="textSecondary">
            5 days ago
          </Typography>
        </div>
        <Hidden only="xs">
          <CommentInput />
        </Hidden>
      </article>
    </>
  );
};

const LikeButton = () => {
  const cx = useFeedPostStyles();
  const [isLiked, setIsLiked] = useState(false);

  return isLiked ? (
    <UnlikeIcon className={cx.liked} onClick={() => setIsLiked(false)} />
  ) : (
    <LikeIcon className={cx.like} onClick={() => setIsLiked(true)} />
  );
};

const SaveButton = () => {
  const cx = useFeedPostStyles();
  const [isSaved, setIsSaved] = useState(false);

  return isSaved ? (
    <RemoveIcon className={cx.saveIcon} onClick={() => setIsSaved(false)} />
  ) : (
    <SaveIcon className={cx.saveIcon} onClick={() => setIsSaved(true)} />
  );
};

const CommentInput = () => {
  const cx = useFeedPostStyles();
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

export default FeedPost;
