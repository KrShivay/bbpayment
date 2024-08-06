/* eslint-disable no-undef */
import axios from "axios";

const apiInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  headers: {"Content-Type": "application/json"},
});

apiInterceptor.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

apiInterceptor.interceptors.response.use(undefined, (error) => {
  return Promise.reject(error);
});

export default apiInterceptor;
