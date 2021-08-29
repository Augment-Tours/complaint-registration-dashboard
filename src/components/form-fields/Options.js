/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import { PostSave, FieldSave } from './Utils';

const OptionsField = ({ field, onFieldSaved, onCancel, index }) => {
  // eslint-disable-next-line no-unused-vars
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState(field);

  useEffect(() => {
    if (json.saved) {
      onFieldSaved(json);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  if (json.saved) {
    return <PostSave json={json} onCancel={onCancel} index={index} field={field} />;
  }
  return <PreSave json={json} setJson={setJson} index={index} onCancel={onCancel} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ index, json, setJson, onCancel }) => {
  const [options, setOptions] = useState([]);

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const addOption = (option) => {
    setOptions(options.concat(option));
  };

  const updateOption = async (index, option) => {
    options[index] = option;
    setOptions(options);

    const optionsObject = options.reduce((acc, option, index) => {
      const key = `option-${index + 1}`;
      const object = { ...acc };
      object[key] = option;
      return object;
    }, {});
    const newJson = { ...json, data: JSON.stringify(optionsObject) };
    setJson(newJson);
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{ px: 2, py: 2, my: 2, mr: 2 }}
      style={{ border: '1px solid lightgrey', borderRadius: '10px' }}
    >
      <Stack
        fullwidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <TextField
          fullwidth
          sx={{ mr: 2 }}
          label="TextField name"
          value={json.name}
          onChange={(e) => handleChange(e.target.value, 'name')}
        />
        <TextField
          label="Label"
          value={json.label}
          onChange={(e) => handleChange(e.target.value, 'label')}
        />
      </Stack>
      <TextField
        sx={{ mb: 1 }}
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e.target.value, 'hint')}
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          sx={{ my: 1 }}
          label={`Option ${index + 1}`}
          value={option.label}
          onChange={(e) => updateOption(index, e.target.value)}
        />
      ))}

      <Button
        color="primary"
        sx={{ px: 0, py: 1, my: 2 }}
        onClick={() => addOption(`option-${options.length + 1}`)}
      >
        Add Option
      </Button>
      <FieldSave
        json={json}
        onCancel={onCancel}
        setJson={setJson}
        index={index}
        handleChange={handleChange}
      />
    </Stack>
  );
};

const PreviewDropDownField = ({ field }) => {
  const { label, is_required, data } = field;
  const options = Object.entries(JSON.parse(data)).map((option, index) => (
    <MenuItem key={index} value={option[0]}>
      {option[1]}
    </MenuItem>
  ));

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel>
          {is_required && '*'} {`${label}`}
        </InputLabel>
        <Select label={` -${label}`}>{options}</Select>
      </FormControl>
    </>
  );
};

export { PreviewDropDownField };

export default OptionsField;
