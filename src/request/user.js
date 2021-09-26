import rf from './requestFactory';

const getAllUsers = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/users/all/`;
  return rf
    .getRequest(url)
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
  country,
  type
) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/registration/`;
  return rf.postRequest(url, {
    username,
    email,
    password1,
    password2,
    first_name,
    last_name,
    status,
    country,
    type
  });
};

const toggleUserStatus = async (userId) => {
  const url = `${process.env.REACT_APP_BACKEND}/users/toggle-status/${userId}/`;
  return rf.postRequest(url);
};

export { getAllUsers, createUser, toggleUserStatus };
