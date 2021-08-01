import rf from './requestFactory';

const getAllRegions = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/all/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createRegion = async (name, symbol, country_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/create/`;
  return rf.postRequest(url, { name, symbol, country_id, status });
};

export { getAllRegions, createRegion };
