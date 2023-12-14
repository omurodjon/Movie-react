import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { session } from './session';
import { config } from 'config';

export const http = axios.create({ baseURL: config.baseURL });

http.interceptors.request.use(request => {
  const token = session.get();

  request.headers = { ...request.headers, [config.backendTokenKEY]: token } as any;

  return request;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error instanceof AxiosError) toast.error(error.response?.data);
    return Promise.reject(error);
  }
);
