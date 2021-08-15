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

export { getAllFieldsByForm };
