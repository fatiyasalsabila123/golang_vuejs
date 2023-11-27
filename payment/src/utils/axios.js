import Axios from 'axios';

const axiosInstance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "david",
  },
});

axiosInstance.interceptors.request.use((config) => {
  delete config.headers['Authorization'];
  return config;
});

export default axiosInstance;