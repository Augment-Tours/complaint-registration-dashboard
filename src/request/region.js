import axios from 'axios';

const getAllRegions = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/all/`;
  console.log(url);
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createRegion = async (name, symbol, country_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/create/`;
  return axios.post(url, { name, symbol, country_id, status });
};

export { getAllRegions, createRegion };
