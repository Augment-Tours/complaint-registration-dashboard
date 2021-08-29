import rf from './requestFactory';

const getAllRegions = async (status = '') => {
  let url = `${process.env.REACT_APP_BACKEND}/locations/region/all/`;
  if (status === 'active') {
    url = `${url}?status=active`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const getRegionDetail = async (region_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/detail/${region_id}`;
  return rf.getRequest(url);
};

const createRegion = async (name, symbol, country_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/create/`;
  return rf.postRequest(url, { name, symbol, country_id, status });
};

const editRegion = async (region_id, name, symbol, country_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/edit/`;
  return rf.postRequest(url, { region_id, name, symbol, country_id, status });
};

export { getAllRegions, createRegion, getRegionDetail, editRegion };
