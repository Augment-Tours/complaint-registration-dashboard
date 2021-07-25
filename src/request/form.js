import axios from 'axios';

const getAllForms = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/all/`;
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createForm = async (form) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/create/`;
  return axios
    .post(url, form)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllForms, createForm };