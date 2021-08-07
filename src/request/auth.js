import rf from './requestFactory';

// when authenticated requests come use the access token stored in the local storage the make the authenticated request
const login = async (username, password) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/login/`;
  console.log(url);
  return rf.postRequest(url, { username, password }).then((res) => {
    localStorage.setItem('access-token', res.data.token);
    return res;
  });
};

const loggedInProfile = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/users/profile/`;
  return rf.getRequest(url);
};

export { login, loggedInProfile };