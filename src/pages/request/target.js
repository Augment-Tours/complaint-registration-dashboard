import axios from 'axios';

const getAllTargets = async (pageNo) => {
  const url = 'http://localhost:3000/targets/museums/86eb131b-72b6-4fe3-88dc-5ad3bd8ae2e3/';
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

/* eslint-disable camelcase */
const createTargetImage = async (information, model, x_location, y_location, floor, museums_id) => {
  const url = 'http://localhost:3000/targets/';
  return axios.post(url, { information, model, x_location, y_location, floor, museums_id });
};

export { getAllTargets, createTargetImage };
