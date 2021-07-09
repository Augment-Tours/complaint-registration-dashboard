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

const createMuseum = async (name, description, image) => {
  const url = 'http://localhost:3000/museums/';
  return axios.post(url, { name, description, image });
};

export { getAllMuseums, createMuseum };
