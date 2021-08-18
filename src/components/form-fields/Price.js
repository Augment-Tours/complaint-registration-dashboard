/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';

const PreviewPriceField = ({ field }) => {
  const { label, is_required } = field;

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">
          {is_required && '*'} {label}
        </InputLabel>
        <OutlinedInput
          //   id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label={`--${label}`}
        />
      </FormControl>
    </>
  );
};

export { PreviewPriceField };
