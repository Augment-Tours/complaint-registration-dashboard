/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getAllCities } from '../../request/cities';
import { getAllRegions } from '../../request/region';

const PreviewCityField = ({ field }) => {
  const { label, is_required } = field;
  const [cities, setCities] = useState([]);

  const citiesComp = cities.map((city, index) => (
    <MenuItem key={index} value={city.id}>
      {city.name}
    </MenuItem>
  ));

  useEffect(() => {
    getAllCities().then((cities) => {
      setCities(cities);
    });
  }, []);

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel>
          {is_required && '*'} {`${label}`}
        </InputLabel>
        <Select label={` -${label}`}>{citiesComp}</Select>
      </FormControl>
    </>
  );
};

const PreviewRegionField = ({ field }) => {
  const { label, is_required } = field;
  const [regions, setRegions] = useState([]);

  const regionsComp = regions.map((city, index) => (
    <MenuItem key={index} value={city.id}>
      {city.name}
    </MenuItem>
  ));

  useEffect(() => {
    getAllRegions().then((region) => {
      setRegions(region);
    });
  }, []);

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel>
          {is_required && '*'} {`${label}`}
        </InputLabel>
        <Select label={` -${label}`}>{regionsComp}</Select>
      </FormControl>
    </>
  );
};

export { PreviewCityField, PreviewRegionField };
