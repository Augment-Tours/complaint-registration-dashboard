import React from 'react';

import TextBox, { PreviewTextField, PreviewMultiLineTextField } from './TextBox';
import Options, { PreviewDropDownField } from './Options';
import Range, { PreviewRangeField } from './Range';
import DateRange from './DateRange';
import ImageField, { PreviewImageField } from './Image';
import DateField, { PreviewDateField } from './Date';
import { PreviewCityField, PreviewRegionField } from './Location';

const FieldChooser = ({ index, field, onFieldSaved, onCancel }) => {
  let chosenInput = null;
  if (
    field.type === 'textbox' ||
    field.type === 'multiline_textbox' ||
    field.type === 'region' ||
    field.type === 'city'
  ) {
    chosenInput = (
      <TextBox index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'date') {
    chosenInput = (
      <DateField index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi-select') {
    chosenInput = (
      <Options index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'range') {
    chosenInput = (
      <Range index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
    );
  } else if (field.type === 'image' || field.type === 'file') {
    chosenInput = (
      <ImageField index={index} field={field} onFieldSaved={onFieldSaved} onCancel={onCancel} />
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
  field = field.field;
  if (field.type === 'textbox') {
    chosenInput = <PreviewTextField field={field} />;
  } else if (field.type === 'multiline_textbox') {
    chosenInput = <PreviewMultiLineTextField field={field} />;
  } else if (field.type === 'dropdown') {
    chosenInput = <PreviewDropDownField field={field} />;
  } else if (field.type === 'image') {
    chosenInput = <PreviewImageField field={field} />;
  } else if (field.type === 'range') {
    chosenInput = <PreviewRangeField field={field} />;
  } else if (field.type === 'date') {
    chosenInput = <PreviewDateField field={field} />;
  } else if (field.type === 'city') {
    chosenInput = <PreviewCityField field={field} />;
  } else if (field.type === 'region') {
    chosenInput = <PreviewRegionField field={field} />;
  }
  return chosenInput;
};

export { PreviewFieldChooser };

export default FieldChooser;
