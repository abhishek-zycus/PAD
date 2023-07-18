const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') ? true : false;
};

export default isAuthenticated;
