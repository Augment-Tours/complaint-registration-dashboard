/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Checkbox,
  Typography
} from '@material-ui/core';
import { getAllCities, getCitiesByRegion } from '../../request/cities';
import { getAllRegions } from '../../request/region';
import { PostSave, FieldSave } from './Utils';

const Region = ({ field, onFieldSaved, onCancel, index }) => {
  // eslint-disable-next-line no-unused-vars
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState(field);

  useEffect(() => {
    if (json.saved) {
      onFieldSaved(json, index);
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
  const [data, setData] = useState({
    includeCity: false
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setDataJson = (includeCity) => {
    const data = { includeCity };
    handleChange(JSON.stringify(data), 'data');
    setData(data);
  };

  useEffect(() => {
    handleChange(JSON.stringify(data), 'data');
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
      <TextField
        sx={{ mb: 2 }}
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e.target.value, 'hint')}
      />
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Checkbox
          checked={data.includeCity}
          onChange={() => {
            setDataJson(!data.includeCity);
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>Include City?</Typography>
      </Stack>

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
const PreviewCityField = ({ field }) => {
  const { label, is_required } = field;

  const [cities, setCities] = useState([]);

  const citiesComp = cities.map((city, index) => (
    <MenuItem key={index} value={city.id}>
      {city.name}
    </MenuItem>
  ));

  useEffect(() => {
    getAllCities('active').then((cities) => {
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
  const [cities, setCities] = useState([]);

  let { data } = field;
  data = JSON.parse(data);

  console.log(data.includeCity);

  const handleRegionChange = (e) => {
    getCitiesByRegion(e.target.value).then((cities) => {
      setCities(cities);
    });
  };

  const regionsComp = regions.map((region, index) => (
    <MenuItem key={index} value={region.id}>
      {region.name}
    </MenuItem>
  ));

  const citiesComp = cities.map((city, index) => (
    <MenuItem key={index} value={city.id}>
      {city.name}
    </MenuItem>
  ));

  useEffect(() => {
    getAllRegions('active').then((region) => {
      setRegions(region);
    });
  }, []);

  return (
    <>
      <Stack>
        <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
          <InputLabel>
            {is_required && '*'} {`${label}`}
          </InputLabel>
          <Select onChange={handleRegionChange} label={` -${label}`}>
            {regionsComp}
          </Select>
        </FormControl>
      </Stack>
      {data.includeCity && (
        <Stack>
          <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
            <InputLabel>{is_required && '*'} City</InputLabel>
            <Select label="--Field">{citiesComp}</Select>
          </FormControl>
        </Stack>
      )}
    </>
  );
};

export { PreviewCityField, PreviewRegionField };
export default Region;
