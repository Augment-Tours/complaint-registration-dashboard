import rf from './requestFactory';

const getAllCities = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/all/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createCity = async (name, symbol, region_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/create/`;
  return rf.postRequest(url, { name, symbol, region_id, status });
};

// const cityDetail = async (city_id) => {
//   const url = `${process.env.REACT_APP_BACKEND}/locations/city/edit/`;
// }

export { getAllCities, createCity };
