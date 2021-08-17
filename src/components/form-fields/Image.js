/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Typography, Checkbox } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const ImageField = ({ field, onFieldSaved, onCancel, index }) => {
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
  const [imageData, setImageData] = useState({
    maxUploadCount: 1,
    maxUploadSizeInMb: 1,
    allowMultipleUpload: false
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setImageJson = (maxUploadCount, maxUploadSizeInMb, allowMultipleUpload) => {
    const newImageJson = { maxUploadCount, maxUploadSizeInMb, allowMultipleUpload };
    handleChange(JSON.stringify(newImageJson), 'data');
    setImageData(newImageJson);
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
        value={imageData.maxUploadCount}
        label={`Max Number of ${json.type} Uploads`}
        onChange={(e) =>
          setImageJson(e.target.value, imageData.maxUploadSizeInMb, imageData.allowMultipleUpload)
        }
      />
      <TextField
        sx={{ mb: 2 }}
        value={imageData.maxUploadSizeInMb}
        label="Maximum size of upload (in MBs)"
        onChange={(e) =>
          setImageJson(imageData.maxUploadCount, e.target.value, imageData.allowMultipleUpload)
        }
      />
      <Stack direction="row" alignItems="center">
        <Checkbox
          checked={imageData.allowMultipleUpload}
          onChange={() => {
            setImageJson(
              imageData.maxUploadCount,
              imageData.maxUploadSizeInMb,
              !imageData.allowMultipleUpload
            );
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>Allow Multiple {json.type} Uploads</Typography>
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

const PreviewImageField = ({ field }) => {
  const { label } = field;
  return (
    <>
      <Button sx={{ my: 1 }} variant="contained" component="label">
        {label}
        <input type="file" hidden />
      </Button>
    </>
  );
};

export { PreviewImageField };

export default ImageField;
