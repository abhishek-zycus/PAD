// export const baseURL = 'https://pad-to09.onrender.com/api/';
export const baseURL = 'http://localhost:5000/api/';

const endpoints = {
  loginEndpoint: baseURL + 'login',
  dashboardData: baseURL + 'dashboard',
  registerEndpoint: baseURL + 'register',
  roleEndpoint: baseURL + 'role',
  canCreateRoleEndpoint: baseURL + 'role/canAddRole',
};

export default endpoints;
