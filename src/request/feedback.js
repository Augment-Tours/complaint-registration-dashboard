import Cookies from 'js-cookie';
import rf from './requestFactory';


const getOwnedFeedbacks = () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/feedback/list/`;
  return rf.getRequest(url).then((res) => res.data.results);
};

const getAllFeedbacks = () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/feedback/all/`;
  console.log(url);
  return rf.getRequest(url).then((res) => res.data.results);
};

const createFeedback = (feedback) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/feedback/create/`;
  return rf
    .postRequest(url, feedback, { headers: { 'X-CSRFToken': Cookies.get('csrftoken') } })
    .then((res) => res.data);
};

export { getOwnedFeedbacks, getAllFeedbacks, createFeedback };
