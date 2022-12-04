import axios, { AxiosRequestConfig } from 'axios';

import { API_HOST } from '../../constants';

const $api = axios.create({ baseURL: API_HOST });

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

export default $api;
