import React, { useState } from 'react';

import {
  Stack,
  Button,
  IconButton,
  TextField,
  Typography,
  Drawer,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

import { createCountry } from '../../request/country';

const CreateCountry = ({ isOpenFilter, toggleDrawer }) => {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');
  const [symbol, setSymbol] = useState('');
  const [timezone, setTimezone] = useState('');
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
          Add Country
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="Country"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        label="Currency"
        style={{ marginBottom: '15px' }}
        onChange={(e) => {
          setCurrency(e.target.value);
        }}
        value={currency}
      />
      <TextField
        fullWidth
        label="Symbol"
        style={{ marginBottom: '30px' }}
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
        value={symbol}
      />
      <TextField
        fullWidth
        label="Timezone, Eg: EAT, GMT"
        style={{ marginBottom: '30px' }}
        onChange={(e) => {
          setTimezone(e.target.value);
        }}
        value={timezone}
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
          createCountry(name, currency, symbol, timezone, status)
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
        {!isCreating ? 'Add' : 'Creating Country...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default CreateCountry;
