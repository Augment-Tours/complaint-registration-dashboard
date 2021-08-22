/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack } from '@material-ui/core';

import { FieldSave, PostSave } from './Utils';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const FormTextField = ({ field, onFieldSaved, onCancel, index }) => {
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
  return <PreSave json={json} onCancel={onCancel} setJson={setJson} index={index} />;
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, index, onCancel }) => {
  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
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

const PreviewTextField = ({ field }) => {
  const { hint, label, is_required } = field;
  let finalLabel = label;
  if (is_required) {
    finalLabel = `* ${label}`;
  }
  return (
    <>
      <TextField fullWidth sx={{ my: 1 }} label={finalLabel} placeholder={hint} />
    </>
  );
};

const PreviewMultiLineTextField = ({ field }) => {
  const { hint, label, is_required } = field;
  let finalLabel = label;
  if (is_required) {
    finalLabel = `* ${label}`;
  }
  return (
    <>
      {/* <Typography>
        {is_required && '*'} {label}
      </Typography> */}
      <TextField
        multiline
        fullWidth
        sx={{ my: 1 }}
        rows={3}
        label={finalLabel}
        placeholder={hint}
      />
    </>
  );
};

export { PreviewTextField, PreviewMultiLineTextField };

export default FormTextField;
