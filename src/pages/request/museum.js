import axios from 'axios';

const getAllMuseums = async (pageNo) => {
  const url = 'http://localhost:3000/museums/';
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllMuseums };
