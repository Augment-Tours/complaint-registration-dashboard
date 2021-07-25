import axios from 'axios';

const getAllCategories = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/category/all/`;
  return axios
    .get(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createCategory = async (form) => {
  const url = `${process.env.REACT_APP_BACKEND}/category/create/`;
  return axios
    .post(url, form)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllCategories, createCategory };
