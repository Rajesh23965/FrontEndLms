
// src/utils/authToken.js
export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};


// Stores the token in localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Removes the token from localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
};
