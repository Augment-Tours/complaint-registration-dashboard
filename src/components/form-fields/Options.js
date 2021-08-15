/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Typography, Checkbox } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';

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
  return <PreSave json={json} setJson={setJson} index={index} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ json, setJson }) => {
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

    const optionsString = options.reduce((acc, option, index) => {
      if (index === 0) {
        return `{option-${index + 1}: ${option}}`;
      }
      return `${acc.substring(0, acc.length - 1)},option-${index + 1}: ${option}}`;
    }, '{}');
    const newJson = { ...json };
    newJson.data = optionsString;
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
        sx={{ mb: 2 }}
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e.target.value, 'hint')}
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          sx={{ my: 2 }}
          label={`Option ${index + 1}`}
          value={option.label}
          onChange={(e) => updateOption(index, e.target.value)}
        />
      ))}

      <Button
        color="primary"
        sx={{ px: 0, py: 1, mt: 2 }}
        onClick={() => addOption(`option-${options.length + 1}`)}
      >
        Add Option
      </Button>
      <Stack direction="row" alignItems="center">
        <Checkbox
          checked={json.is_required}
          onChange={() => {
            handleChange(!json.is_required, 'is_required');
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>Is Required?</Typography>
      </Stack>
      <Button
        variant="contained"
        to=""
        // disabled={isCreating}
        // style={{ padding: '10px 20px' }}
        sx={{ px: 0, py: 1, mt: 2 }}
        width="50%"
        onClick={() => {
          // saveField(true);
          handleChange(true, 'saved');
        }}
      >
        Save
      </Button>
    </Stack>
  );
};

const PostSave = ({ index, onCancel, field }) => (
  <Stack direction="row" alignItems="center" sx={{ px: 0, mt: 2 }}>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.name}
    </Typography>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.hint}
    </Typography>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.label}
    </Typography>
    <Button
      onClick={() => {
        onCancel(index);
      }}
    >
      Cancel
    </Button>
    <DragHandleIcon className="drag-handle" />
  </Stack>
);

export default OptionsField;
