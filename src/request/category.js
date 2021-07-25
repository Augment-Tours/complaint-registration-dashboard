import axios from 'axios';

const getAllCategories = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/all/`;
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createCategory = async (name, status, parent, form_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/create/`;
  return axios
    .post(url, { name, status, parent, form_id })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllCategories, createCategory };
