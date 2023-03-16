import axios from 'axios';
import { SERVICE_URL } from './env';
import { store } from '../app/store';

const client = axios.create({
  baseURL: SERVICE_URL
});

client.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => error
);

export default client;
