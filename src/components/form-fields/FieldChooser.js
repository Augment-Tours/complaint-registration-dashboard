import React from 'react';

import TextBox from './TextBox';
import Options from './Options';

const FieldChooser = ({ field, onFieldSaved }) => {
  let chosenInput;
  if (
    field.type === 'textbox' ||
    field.type === 'file' ||
    field.type === 'image' ||
    field.type === 'date' ||
    field.type === 'multiline_textbox'
  ) {
    chosenInput = <TextBox field={field} onFieldSaved={onFieldSaved} />;
  } else if (field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi-select') {
    chosenInput = <Options field={field} onFieldSaved={onFieldSaved} />;
  }
  return chosenInput;
};

export default FieldChooser;
