import axios from "axios";
import { getToken } from './auth';

const api = axios.create({
  baseURL: "https://localhost:5001/api/v1/",
  responseType: "json",
});

api.interceptors.request.use(async config => {
  
 const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('pegou token');
  }

  return config;
});

export default api;