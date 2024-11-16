import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getAuthToken } from "../../utils/auth";
import { handleError } from "../../utils/errorHandler";

// Async thunk for creating a new user
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found. Please login.');
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('http://localhost:8000/api/users/create', userData, config);
      console.log("Submitting user data:", userData);
      return data; // Return the response data for reducer

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      console.log("Error creating user:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching all users
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/users/all');
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating a user
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found. Please login.');
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`http://localhost:8000/api/users/${userData.id}`, userData.userData, config);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, { rejectWithValue }) => {
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

      await axios.delete(`http://localhost:8000/api/users/${id}`, config);
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:8000/api/users/logout');
      localStorage.removeItem('token');
      return true; // Indicate successful logout
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);
