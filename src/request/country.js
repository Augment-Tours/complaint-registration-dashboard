import rf from './requestFactory';

const getAllCountries = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/all/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createCountry = async (name, currency, symbol, timezone, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/create/`;
  return rf.postRequest(url, { name, currency, symbol, timezone, status });
};

const editCountry = async (country_id, name, currency, symbol, timezone, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/edit/`;
  return rf.postRequest(url, { country_id, name, currency, symbol, timezone, status });
};

const getCountryDetail = async (country_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/detail/${country_id}`;
  return rf.getRequest(url);
};

export { getAllCountries, createCountry, editCountry, getCountryDetail };
