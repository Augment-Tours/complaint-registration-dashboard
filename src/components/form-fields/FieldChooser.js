import React from 'react';

import TextBox from './TextBox';
import MultiLineTextBox from './MultiLineTextBox';
import Options from './Options';

const FieldChooser = ({ field, onFieldSaved }) => {
  let chosenInput;
  if (field.type === 'textbox') {
    chosenInput = <TextBox field={field} onFieldSaved={onFieldSaved} />;
  } else if (field.type === 'multiline_textbox') {
    chosenInput = <MultiLineTextBox field={field} onFieldSaved={onFieldSaved} />;
  } else if (field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi-select') {
    chosenInput = <Options field={field} onFieldSaved={onFieldSaved} />;
  }
  return chosenInput;
};

export default FieldChooser;
