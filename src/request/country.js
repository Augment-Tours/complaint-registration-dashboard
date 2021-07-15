import axios from 'axios';

const getAllCountries = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/all/`;
  console.log(url);
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createCountry = async (name, currency, symbol, timezone, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/create/`;
  return axios.post(url, { name, currency, symbol, timezone, status });
};

export { getAllCountries, createCountry };
