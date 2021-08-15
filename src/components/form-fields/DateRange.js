/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Stack, Button, Typography } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker from '@material-ui/lab/DateRangePicker';

const RangeField = ({ field, onFieldSaved }) => {
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
  const [rangeData, setRangeData] = useState({ startDate: null, endDate: null });
  // const [value, setValue] = useState([null, null]);

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setRange = (minVal, maxVal) => {
    const newRange = { startDate: minVal, endDate: maxVal };
    handleChange(JSON.stringify(newRange), 'data');
    setRangeData(newRange);
    // console.log(newRange);
  };
  // console.log(value);
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={[rangeData.startDate, rangeData.endDate]}
          onChange={(newValue) => {
            setRange(newValue[0], newValue[1]);
          }}
          renderInput={(startProps, endProps) => (
            <fragment>
              <TextField sx={{ my: 2 }} {...startProps} />
              <TextField sx={{ my: 2 }} {...endProps} />
            </fragment>
          )}
        />
      </LocalizationProvider>
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

export default RangeField;
