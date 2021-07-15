import React, { useState, useEffect } from 'react';

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

import { getAllCountries } from '../../request/country';
import { createRegion } from '../../request/region';

const CreateRegion = ({ isOpenFilter, toggleDrawer }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isCreating, setIsCreating] = useState(false);
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    getAllCountries().then((res) => {
      setCountries(res);
    });
  }, []);

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
          Add Region
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="Region Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Symbol"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
        value={symbol}
      />
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Country</InputLabel>
        <Select onChange={handleCountryChange} label="Country">
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
          createRegion(name, symbol, country, status)
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
        {!isCreating ? 'Add' : 'Creating Region...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default CreateRegion;
