import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { usePostStyles } from '../../styles';
import {
  Typography,
  Button,
  Hidden,
  TextField,
  Divider,
  Avatar,
} from '@material-ui/core';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_POST } from '../../graphql/subscriptions';
import { UserContext } from '../../context';
import {
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
  CREATE_COMMENT,
} from '../../graphql/mutations';
import { Path } from '../../consts';
import { formatDateToNowShort } from '../../utils/formatDate';

// Components
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
import PostSkeleton from './PostSkeleton';
import UserCard from '../shared/UserCard';

const Post = ({ postId }) => {
  const cx = usePostStyles();
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const { data, loading } = useSubscription(GET_POST, {
    variables: { postId },
  });

  if (loading) {
    return <PostSkeleton />;
  }

  const {
    id,
    likes,
    saved_posts,
    likes_aggregate: {
      aggregate: { count: likesCount },
    },
    caption,
    user,
    image,
    comments,
    created_at,
    location,
  } = data.posts_by_pk;

  return (
    <div className={cx.postContainer}>
      <article className={cx.article}>
        <div className={cx.postHeader}>
          <UserCard user={user} location={location} avatarSize={32} />
          <MoreIcon
            className={cx.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        <div className={cx.postImage}>
          <img src={image} alt="Post media" className={cx.image} />
        </div>
        <div className={cx.postButtonsWrapper}>
          <div className={cx.postButtons}>
            <LikeButton likes={likes} postId={id} authorId={user.id} />
            <Link to={Path.POST(id)}>
              <CommentIcon />
            </Link>
            <SaveButton savedPosts={saved_posts} postId={postId} />
          </div>
          <Typography className={cx.likes} variant="subtitle2">
            <span>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</span>
          </Typography>
          <div
            style={{
              overflowY: 'scroll',
              padding: '16px 12px',
              height: '100%',
            }}
          >
            <AuthorCaption
              user={user}
              createdAt={created_at}
              caption={caption}
            />
            {comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>
          <Typography className={cx.datePosted} color="textSecondary">
            {formatDateToNowShort(created_at)}
          </Typography>
          <Hidden only="xs">
            <div className={cx.comment}>
              <Divider />
              <CommentInput postId={postId} profileId={user.id} />
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

const AuthorCaption = ({ user, createdAt, caption }) => {
  const cx = usePostStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        src={user.profile_image}
        alt="User avatar"
        style={{ marginRight: 14, width: 32, height: 32 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column ' }}>
        <Link to={Path.ACCOUNT(user.username)}>
          <Typography
            variant="subtitle2"
            component="span"
            className={cx.username}
          >
            {user.username}
          </Typography>{' '}
          <Typography
            variant="body2"
            component="span"
            className={cx.postCaption}
            style={{ paddingLeft: 0 }}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </Link>
        <Typography
          style={{ marginTop: 16, marginBottom: 4, display: 'inline-block' }}
          color="textSecondary"
          variant="caption"
        >
          {formatDateToNowShort(createdAt)}
        </Typography>
      </div>
    </div>
  );
};

const UserComment = ({ comment }) => {
  const cx = usePostStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        src={comment.users.profile_image}
        alt="User avatar"
        style={{ marginRight: 14, width: 32, height: 32 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column ' }}>
        <Link to={Path.ACCOUNT(comment.users.username)}>
          <Typography
            variant="subtitle2"
            component="span"
            className={cx.username}
          >
            {comment.users.username}
          </Typography>{' '}
          <Typography
            variant="body2"
            component="span"
            className={cx.postCaption}
            style={{ paddingLeft: 0 }}
          >
            {comment.content}
          </Typography>
        </Link>
        <Typography
          style={{ marginTop: 16, marginBottom: 4, display: 'inline-block' }}
          color="textSecondary"
          variant="caption"
        >
          {formatDateToNowShort(comment.created_at)}
        </Typography>
      </div>
    </div>
  );
};

const LikeButton = ({ likes, postId, authorId }) => {
  const cx = usePostStyles();
  const { currentUser } = useContext(UserContext);
  const isAlreadyLiked = likes.some(
    ({ user_id }) => user_id === currentUser.id
  );
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUser.id,
    profileId: authorId,
  };

  const handleLikePost = () => {
    setIsLiked(true);
    likePost({ variables });
  };

  const handleUnlikePost = () => {
    setIsLiked(false);
    unlikePost({ variables });
  };

  return isLiked ? (
    <UnlikeIcon
      style={{ cursor: 'pointer' }}
      className={cx.liked}
      onClick={handleUnlikePost}
    />
  ) : (
    <LikeIcon
      style={{ cursor: 'pointer' }}
      className={cx.like}
      onClick={handleLikePost}
    />
  );
};

const SaveButton = ({ savedPosts, postId }) => {
  const cx = usePostStyles();
  const { currentUser } = useContext(UserContext);
  const isAlreadySaved = savedPosts.some(
    ({ user_id }) => user_id === currentUser.id
  );
  const [isSaved, setIsSaved] = useState(isAlreadySaved);
  const [savePost] = useMutation(SAVE_POST);
  const [unsavePost] = useMutation(UNSAVE_POST);
  const variables = {
    postId,
    userId: currentUser.id,
  };

  const handleSavePost = () => {
    setIsSaved(true);
    savePost({ variables });
  };

  const handleUnsavePost = () => {
    setIsSaved(false);
    unsavePost({ variables });
  };

  return isSaved ? (
    <RemoveIcon
      style={{ cursor: 'pointer' }}
      className={cx.saveIcon}
      onClick={handleUnsavePost}
    />
  ) : (
    <SaveIcon
      style={{ cursor: 'pointer' }}
      className={cx.saveIcon}
      onClick={handleSavePost}
    />
  );
};

const CommentInput = ({ postId, profileId }) => {
  const cx = usePostStyles();
  const { currentUser } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT);

  const handleCreateComment = () => {
    const variables = {
      postId,
      userId: currentUser.id,
      content,
      profileId,
    };

    createComment({ variables });
    setContent('');
  };

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
        onClick={handleCreateComment}
      >
        Post
      </Button>
    </div>
  );
};

export default Post;
