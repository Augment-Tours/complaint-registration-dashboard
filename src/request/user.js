import axios from 'axios';

const getAllUsers = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/users/all/`;
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

/* eslint-disable camelcase */
const createUser = async (information, model, x_location, y_location, floor, museums_id) => {
  const url = 'http://localhost:3000/targets/';
  return axios.post(url, { information, model, x_location, y_location, floor, museums_id });
};

export { getAllUsers, createUser };
