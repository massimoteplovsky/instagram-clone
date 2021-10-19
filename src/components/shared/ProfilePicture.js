import React, { useState, useContext, useRef } from 'react';
import { useProfilePictureStyles } from '../../styles';
import { Person } from '@material-ui/icons';
import { handleImageUpload } from '../../utils/imageUpload';
import { useMutation } from '@apollo/react-hooks';
import { EDIT_USER_AVATAR } from '../../graphql/mutations';
import { UserContext } from '../../context';

const ProfilePicture = ({ size, image, isOwner }) => {
  const cx = useProfilePictureStyles({ size, isOwner });
  const { currentUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(image);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
  const inputRef = useRef();

  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const url = await handleImageUpload(event.target.files[0]);
      const variables = { profileImage: url, id: currentUser.id };
      await editUserAvatar({ variables });
      setAvatar(url);
    }
  };

  const handleFileUpload = () => {
    inputRef.current.click();
  };

  return (
    <section className={cx.section}>
      <input
        type="file"
        accept="/image/*"
        style={{ display: 'none' }}
        onChange={handleUploadAvatar}
        ref={inputRef}
      />
      <div
        className={cx.wrapper}
        onClick={isOwner ? handleFileUpload : () => null}
      >
        {image ? (
          <img src={avatar} alt="User avatar" className={cx.image} />
        ) : (
          <Person className={cx.person} />
        )}
      </div>
    </section>
  );
};

export default ProfilePicture;
