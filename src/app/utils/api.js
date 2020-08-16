import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import API_ENDPOINTS from '../_shared/constants/api.endpoints';

const api = axios.create({
  baseURL: API_ENDPOINTS.baseURL,
});

api.interceptors.request.use(
  (config) => {
    const options = { ...config };
    if (localStorage.getItem('role')) {
      options.headers.role = localStorage.getItem('role');
    }
    options.headers['Content-Type'] = 'application/json';
    return options;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && [401, 403].indexOf(error.response.status) !== -1) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

const get = (param, queryParams) => trackPromise(api.get(param, { params: queryParams }));

const post = (param, body) => trackPromise(api.post(param, body));

const put = (param, body) => trackPromise(api.put(param, body));

const patch = (param, body) => trackPromise(api.patch(param, body));

const del = (param) => trackPromise(api.delete(param));

export default {
  get,
  post,
  put,
  patch,
  deleteIt: del,
};
