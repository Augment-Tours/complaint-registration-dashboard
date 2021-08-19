import rf from './requestFactory';

const getAllForms = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/all/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createForm = async (form) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/create/`;
  return rf.postRequest(url, form).then((res) => res.data);
};

const deleteForm = async (formId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/delete/${formId}/`;
  return rf.postRequest(url, {}).then((res) => res.data);
};

export { getAllForms, createForm, deleteForm };
