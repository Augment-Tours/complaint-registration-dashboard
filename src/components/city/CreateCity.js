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

import { getAllRegions } from '../../request/region';
import { createCity } from '../../request/cities';

const CreateCountry = ({ isOpenFilter, toggleDrawer }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isCreating, setIsCreating] = useState(false);
  const [region, setRegion] = useState('');
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    getAllRegions().then((res) => {
      setRegions(res);
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
          Add City
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullWidth
        label="City Name"
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
        <InputLabel>Region</InputLabel>
        <Select onChange={handleRegionChange} label="Region">
          {regions.map((region) => (
            <MenuItem key={region.id} value={region.id}>
              {region.name}
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
          createCity(name, symbol, region, status)
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

export default CreateCountry;