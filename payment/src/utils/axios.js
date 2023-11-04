import Axios from 'axios';

// Create a new Axios instance
const axiosInstance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "david",
  },
});

// Interceptor to modify requests before they are sent
axiosInstance.interceptors.request.use((config) => {
  // Omit the 'Authorization' header
  delete config.headers['Authorization'];
  return config;
});

export default axiosInstance;