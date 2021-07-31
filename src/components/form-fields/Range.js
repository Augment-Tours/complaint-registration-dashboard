/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Stack, Button, Typography } from '@material-ui/core';

const RangeField = ({ field, onFieldSaved }) => {
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState({ ...field, data: `{"min": "0", "max": "100"}` });

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
  const [rangeData, setRangeData] = useState({ min: 0, max: 100, unit: '' });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setRange = (minVal, maxVal, unit) => {
    const newRange = { min: minVal, max: maxVal, unit };
    handleChange(JSON.stringify(newRange), 'data');
    setRangeData(newRange);
    console.log(newRange);
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
          label="Range Field name"
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
      <TextField
        sx={{ my: 2 }}
        label="Minimum Value"
        value={rangeData.min}
        onChange={(e) => setRange(e.target.value, rangeData.max, rangeData.unit)}
      />
      <TextField
        sx={{ my: 2 }}
        label="Maximum Value"
        value={rangeData.max}
        onChange={(e) => setRange(rangeData.min, e.target.value, rangeData.unit)}
      />
      <TextField
        sx={{ my: 2 }}
        label="Unit"
        value={rangeData.unit}
        onChange={(e) => setRange(rangeData.min, rangeData.min, e.target.value)}
      />
      <Button
        variant="contained"
        to=""
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

export default RangeField;
