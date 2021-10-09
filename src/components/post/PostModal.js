import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePostModalStyles } from '../../styles';
import Modal from 'react-modal';

// Components
import Post from './Post';
import { CloseIcon } from '../../icons';

const PostModal = () => {
  const cx = usePostModalStyles();
  const history = useHistory();
  const { postId } = useParams();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <Modal
        isOpen={true}
        overlayClassName={cx.overlay}
        onRequestClose={handleGoBack}
        style={{
          content: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: 935,
            width: '100%',
            top: '50%',
            left: '50%',
            bottom: 'auto',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            padding: 0,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
          },
        }}
        ariaHideApp={false}
      >
        <Post postId={postId} />
      </Modal>
      <div className={cx.close} onClick={handleGoBack}>
        <CloseIcon />
      </div>
    </>
  );
};

export default PostModal;
