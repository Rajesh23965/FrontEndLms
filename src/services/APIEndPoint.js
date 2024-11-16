import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure credentials (cookies, etc.) are included
});

// Attach token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach token to all requests
  }
  return config;
}, (error) => Promise.reject(error));

// Handle response errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Remove token if 401 Unauthorized occurs
      window.location.href = '/login';  // Redirect to login on token expiry or invalid
    }
    return Promise.reject(error);
  }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteUser = (url) => instance.delete(url);

export default instance;
