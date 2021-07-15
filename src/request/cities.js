import axios from 'axios';

const getAllCities = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/all/`;
  console.log(url);
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createCity = async (name, symbol, region_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/create/`;
  return axios.post(url, { name, symbol, region_id, status });
};

export { getAllCities, createCity };
