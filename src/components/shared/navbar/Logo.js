import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbarStyles } from '../../../styles';
import logo from '../../../images/logo.png';

const Logo = () => {
  const cx = useNavbarStyles();

  return (
    <div className={cx.logoContainer}>
      <Link to="/">
        <div className={cx.logoWrapper}>
          <img src={logo} alt="Instagram" className={cx.logo} />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
