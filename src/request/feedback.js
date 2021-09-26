import rf from './requestFactory';

const getOwnedFeedbacks = () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/feedback/list/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const getAllFeedbacks = () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/feedback/all/`;
  console.log(url);
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const createFeedback = (feedback) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/feedback/create/`;
  return rf
    .postRequest(url, feedback)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getOwnedFeedbacks, getAllFeedbacks, createFeedback };
