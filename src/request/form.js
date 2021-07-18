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

export { getAllForms };
