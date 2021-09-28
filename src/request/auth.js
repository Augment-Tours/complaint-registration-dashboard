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
  const url = `${process.env.REACT_APP_BACKEND}/api/profile/`;
  return rf.getRequest(url);
};

const signup = async ({ username, email, password1, password2, first_name, last_name }) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/registration/`;
  return rf.postRequest(url, {
    username,
    email,
    password1,
    password2,
    first_name,
    last_name
  });
};

const fetchCSRF = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/csrf_cookie/`;
  return rf.getRequest(url, { headers: { 'Access-Control-Allow-Origin': '*' } });
};

export { login, loggedInProfile, signup, fetchCSRF };
