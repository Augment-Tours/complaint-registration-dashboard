import rf from './requestFactory';

const getAllFieldsByForm = async (formId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/fields/${formId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const getAllFieldsByCategory = async (categoryId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/fields/${categoryId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllFieldsByForm, getAllFieldsByCategory };
