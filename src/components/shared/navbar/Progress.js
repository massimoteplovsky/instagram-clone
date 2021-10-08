import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';
import { useNavbarStyles } from '../../../styles';

const Progress = ({ isAnimating }) => {
  const cx = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  return (
    <div
      className={cx.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={cx.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={cx.progressBackround} />
      </div>
    </div>
  );
};

export default Progress;
