/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Stack, Button, Typography } from '@material-ui/core';

const OptionsField = ({ field, onFieldSaved }) => {
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState(field);

  const saveField = (saved) => {
    setSaved(saved);
    if (saved) {
      onFieldSaved(json);
    }
  };

  if (saved) {
    return <PostSave json={json} />;
  }
  return <PreSave json={json} setJson={setJson} saveField={saveField} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ json, setJson, saveField }) => {
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
    console.log(newJson);
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{ px: 2, py: 2, my: 2, mr: 2 }}
      style={{ border: '1px solid lightgrey', borderRadius: '10px' }}
    >
      <Stack
        fullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
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
      <TextField
        label="position"
        type="number"
        onChange={(e) => handleChange(e.target.value, 'position')}
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
        variant="contained"
        color="primary"
        sx={{ px: 0, py: 1, mt: 2 }}
        onClick={() => addOption(`option-${options.length + 1}`)}
      >
        Add Option
      </Button>
      <Button
        variant="contained"
        to="#"
        // disabled={isCreating}
        // style={{ padding: '10px 20px' }}
        sx={{ px: 0, py: 1, mt: 2 }}
        width="50%"
        onClick={() => {
          saveField(true);
        }}
      >
        Save
      </Button>
    </Stack>
  );
};

const PostSave = ({ json }) => {
  console.log(json);
  return (
    <Stack direction="row" alignItems="center" sx={{ px: 0, mt: 2 }}>
      <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
        {json.name}
      </Typography>
      <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
        {json.hint}
      </Typography>
      <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
        {json.label}
      </Typography>
      <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
        {json.position}
      </Typography>
    </Stack>
  );
};

export default OptionsField;
