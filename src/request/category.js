import rf from './requestFactory';

const getAllCategories = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/all/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const getCategoryDetail = async (categoryId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/detail/${categoryId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createCategory = async (name, status, parent, form_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/create/`;
  return rf.postRequest(url, { name, status, parent, form_id }).then((res) => res.data);
};

export { getAllCategories, createCategory, getCategoryDetail };
