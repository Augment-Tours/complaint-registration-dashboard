/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Stack, Button, Typography } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const FormTextField = ({ field, onFieldSaved, onCancel, index }) => {
  // eslint-disable-next-line no-unused-vars
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState(field);

  const saveField = (saved) => {
    setSaved(saved);
    if (saved) {
      onFieldSaved(json);
    }
  };

  if (json.saved) {
    return <PostSave json={json} onCancel={onCancel} index={index} field={field} />;
  }
  return (
    <PreSave json={json} setJson={setJson} index={index} field={field} saveField={saveField} />
  );
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, saveField, index }) => {
  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
    saveField(true);
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
          label={`${json.type} field name`}
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
        value={json.position}
        onChange={(e) => handleChange(e.target.value, 'position')}
      />
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
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.position}
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

export default FormTextField;
