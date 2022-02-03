import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tasks-shvets.getsandbox.com:443',
  timeout: 60 * 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
