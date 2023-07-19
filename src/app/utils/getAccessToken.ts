const getAccessToken = (): string => {
  return localStorage.getItem('token') ?? '';
};

export default getAccessToken;
