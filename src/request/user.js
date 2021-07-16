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
const createUser = async (
  username,
  email,
  password1,
  password2,
  first_name,
  last_name,
  status,
  country
) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/registration/`;
  return axios.post(url, {
    username,
    email,
    password1,
    password2,
    first_name,
    last_name,
    status,
    country
  });
};

export { getAllUsers, createUser };
