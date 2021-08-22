/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Typography, Checkbox } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker from '@material-ui/lab/DateRangePicker';

import { PostSave } from './Utils';

const RangeField = ({ field, onFieldSaved, onCancel, index }) => {
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
  return <PreSave json={json} setJson={setJson} index={index} field={field} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ json, setJson }) => {
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
              <TextField sx={{ my: 2, mr: 5 }} {...startProps} />
              <TextField sx={{ my: 2 }} {...endProps} />
            </fragment>
          )}
        />
      </LocalizationProvider>
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
          handleChange(true, 'saved');
        }}
      >
        Save
      </Button>
    </Stack>
  );
};

export default RangeField;
