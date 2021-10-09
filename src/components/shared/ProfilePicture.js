import React from 'react';
import { useProfilePictureStyles } from '../../styles';
import { Person } from '@material-ui/icons';

const ProfilePicture = ({ size, image, isOwner }) => {
  const cx = useProfilePictureStyles({ size, isOwner });

  return (
    <section className={cx.section}>
      <div className={cx.wrapper}>
        {image ? (
          <img src={image} alt="User avatar" className={cx.image} />
        ) : (
          <Person className={cx.person} />
        )}
      </div>
    </section>
  );
};

export default ProfilePicture;
