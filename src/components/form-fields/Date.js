/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Typography, Checkbox } from '@material-ui/core';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from '@material-ui/pickers';
import DragHandleIcon from '@material-ui/icons/DragHandle';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const DateField = ({ field, onFieldSaved, onCancel, index }) => {
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
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, index }) => {
  const [dateData, setDateData] = useState({
    hideDay: false,
    hideMonth: false
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setDateJson = (hideDay, hideMonth) => {
    const newDateJson = { hideDay, hideMonth };
    handleChange(JSON.stringify(newDateJson), 'data');
    setDateData(newDateJson);
  };

  useEffect(() => {
    handleChange(JSON.stringify(dateData), 'data');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Stack direction="row" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Checkbox
            checked={dateData.hideDay}
            onChange={() => {
              setDateJson(!dateData.hideDay, dateData.hideMonth);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography>Hide Day</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ ml: 10 }}>
          <Checkbox
            checked={dateData.hideMonth}
            onChange={() => {
              setDateJson(dateData.hideDay, !dateData.hideMonth);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography>Hide Month</Typography>
        </Stack>
      </Stack>
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

const PreviewDateField = ({ field }) => {
  const { label, is_required, data } = field;
  const jsonData = JSON.parse(data);

  return (
    <>
      <Typography gutterBottom>
        {is_required && '*'} {label}
      </Typography>
      <TextField
        id="date"
        fullWidth
        label="Birthday"
        type="date"
        // defaultValue="2017-05-24"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </>
  );
};

export { PreviewDateField };

export default DateField;
