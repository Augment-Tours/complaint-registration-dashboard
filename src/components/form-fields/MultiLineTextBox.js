/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Stack, Button, Typography } from '@material-ui/core';

const FormTextField = ({ onFieldSaved }) => {
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState({
    name: 'Multi Line Field Name',
    type: 'multiline_textbox',
    hint: 'Field Hint',
    label: 'Field Label',
    position: '1',
    data: '{}'
  });

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
  const handleChange = (event, field) => {
    const newJson = { ...json };
    newJson[field] = event.target.value;
    setJson(newJson);
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
          label="Multi Line Text Field name"
          value={json.name}
          onChange={(e) => handleChange(e, 'name')}
        />
        <TextField label="Label" value={json.label} onChange={(e) => handleChange(e, 'label')} />
      </Stack>
      <TextField
        sx={{ mb: 2 }}
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e, 'hint')}
      />
      <TextField label="position" type="number" onChange={(e) => handleChange(e, 'position')} />
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

const PostSave = ({ json }) => (
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

export default FormTextField;
