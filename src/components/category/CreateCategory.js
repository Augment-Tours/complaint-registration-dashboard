import React, { useState } from 'react';

import {
  Stack,
  Button,
  IconButton,
  TextField,
  Typography,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

import { createCategory } from '../../request/category';

const CreateCategory = ({ isOpenFilter, toggleDrawer }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const createDrawer = (
    <Drawer
      anchor="right"
      open={isOpenFilter}
      onClose={() => {}}
      PaperProps={{
        sx: { width: 400, border: 'none', overflow: 'hidden', padding: '20px 20px' }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Add Category
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="Category Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        style={{ marginBottom: '20px' }}
      />
      <FormControl variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} label="Status">
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">Inactive</MenuItem>
        </Select>
      </FormControl>
      <p style={{ color: 'red' }}>{error}</p>
      <Button
        variant="contained"
        component={RouterLink}
        to="#"
        disabled={isCreating}
        style={{ marginTop: '20px', padding: '10px 0' }}
        onClick={() => {
          setIsCreating(true);
          createCategory(name, status)
            .then(() => {
              setIsCreating(false);
              toggleDrawer();
            })
            .catch((e) => {
              setError(e.toString());
              setIsCreating(false);
            });
        }}
      >
        {!isCreating ? 'Add' : 'Creating City...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default CreateCategory;
