import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';
import { handleError } from '../../utils/errorHandler';

/* Action to create category */
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found. Please login.'); // Handle missing token
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post('http://localhost:8000/api/category/create', categoryData, config);
      return data.category;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred'; // Handle error message
      return rejectWithValue(errorMessage); // Ensure proper error is passed
    }
  }
);

/* Action to fetch categories */
export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/category/all');
      return data.getAllCategories;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred'; // Add fallback error
      return rejectWithValue(errorMessage); // Pass correct error message
    }
  }
);

/* Action to update category */
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found. Please login.');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`http://localhost:8000/api/category/update/${id}`, categoryData, config);
      return data.category;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

/* Action to delete category */
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found. Please login.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:8000/api/category/delete/${id}`, config);
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);
