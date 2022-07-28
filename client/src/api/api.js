import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
  config.headers.common['X-Content-Type-Options'] = 'nosniff';
  config.headers.common['Content-Type'] = 'text/plain';
  config.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE';
  config.headers.common['Access-Control-Max-Age'] = '86400';
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

api.interceptors.request.use(authInterceptor);