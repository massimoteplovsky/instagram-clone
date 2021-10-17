import React from 'react';
import { Typography } from '@material-ui/core';

const FormError = ({ error }) => {
  if (!error) return null;

  return (
    <Typography
      align="center"
      gutterBottom
      variant="body2"
      style={{ color: 'red' }}
    >
      {error}
    </Typography>
  );
};

export default FormError;
