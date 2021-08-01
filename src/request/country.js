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

export { getAllCountries, createCountry };
