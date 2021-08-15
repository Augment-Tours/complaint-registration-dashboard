import React from 'react';
import { TextField, Typography } from '@material-ui/core';

import TextBox from './TextBox';
import Options from './Options';
import Range from './Range';
import DateRange from './DateRange';

const FieldChooser = ({ index, field, onFieldSaved, onCancel }) => {
  let chosenInput = null;
  if (
    field.type === 'textbox' ||
    field.type === 'file' ||
    field.type === 'image' ||
    field.type === 'date' ||
    field.type === 'multiline_textbox'
  ) {
    chosenInput = (
      <TextBox index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi-select') {
    chosenInput = (
      <Options index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'range') {
    chosenInput = (
      <Range index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'date-range') {
    chosenInput = (
      <DateRange index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  }
  return chosenInput;
};

const PreviewFieldChooser = (field) => {
  let chosenInput = null;
  console.log(field.field.type);
  if (field.field.type === 'textbox') {
    chosenInput = (
      <>
        <Typography>{field.field.name}</Typography>
        <TextField
          fullWidth
          // label={field.field.label}
          placeholder={field.field.hint}
          sx={{ my: 1 }}
        />
      </>
    );
  }
  return chosenInput;
};
export { PreviewFieldChooser };

export default FieldChooser;
