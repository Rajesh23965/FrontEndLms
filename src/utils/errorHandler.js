// src/utils/errorHandler.js
export const handleError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Remove invalid token
      window.location.href = '/login';  // Redirect to login page
    }
    return error.response?.data?.message || error.message; // Return error message
  };
  