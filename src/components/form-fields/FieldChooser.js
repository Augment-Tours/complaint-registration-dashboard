import React from 'react';
// import { Container, Draggable } from 'react-smooth-dnd';

import TextBox from './TextBox';
import Options from './Options';
import Range from './Range';
import DateRange from './DateRange';

const FieldChooser = ({ index, field, onFieldSaved, onCancel }) => {
  let chosenInput = null;
  console.log(index);
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
    chosenInput = <Options field={field} onFieldSaved={onFieldSaved} />;
  } else if (field.type === 'range') {
    chosenInput = <Range field={field} onFieldSaved={onFieldSaved} />;
  } else if (field.type === 'date-range') {
    chosenInput = <DateRange field={field} onFieldSaved={onFieldSaved} />;
  }
  return chosenInput;
};

export default FieldChooser;
