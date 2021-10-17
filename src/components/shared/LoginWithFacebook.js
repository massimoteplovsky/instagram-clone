import React from 'react';
import { Button } from '@material-ui/core';
import FacebookIconBlue from '../../images/facebook-icon-blue.svg';
import FacebookIconWhite from '../../images/facebook-icon-white.png';
import { useLoginPageStyles } from '../../styles';

export const LoginWithFacebook = ({ color, iconColor, variant, onLogin }) => {
  const classes = useLoginPageStyles();
  const facebookIcon =
    iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;

  return (
    <Button fullWidth color={color} variant={variant} onClick={onLogin}>
      <img
        src={facebookIcon}
        alt="facebook icon"
        className={classes.facebookIcon}
      />
      Log In with Facebook
    </Button>
  );
};

export default LoginWithFacebook;
