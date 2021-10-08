import React from 'react';
import { Typography } from '@material-ui/core';
import { useFollowSuggestionsStyles } from '../../styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDefaultUser } from '../../data';

// Components
import { LoadingLargeIcon } from '../../icons';
import FollowSuggestionItem from './FollowSuggestionItem';

const FollowSuggestions = () => {
  const cx = useFollowSuggestionsStyles();
  const loading = false;

  return (
    <div className={cx.container} style={{ marginTop: '-30px' }}>
      <Typography
        className={cx.typography}
        color="textSecondary"
        variant="subtitle2"
      >
        Suggestions for you
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          className={cx.slide}
          dots={false}
          speed={1000}
          infinite
          touchThreshold={1000}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={3}
          easing="ease-in-out"
        >
          {Array.from({ length: 10 }, () => getDefaultUser()).map((user) => (
            <FollowSuggestionItem key={user.id} user={user} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FollowSuggestions;
