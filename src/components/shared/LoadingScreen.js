import React from 'react';
import { useLoadingScreenStyles } from '../../styles';
import { LogoLoadingIcon } from '../../icons';

const LoadingScreen = () => {
  const cx = useLoadingScreenStyles();

  return (
    <section className={cx.section}>
      <span>
        <LogoLoadingIcon />
      </span>
    </section>
  );
};

export default LoadingScreen;
