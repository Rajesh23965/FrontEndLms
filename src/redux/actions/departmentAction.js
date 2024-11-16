import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import { handleError } from "../../utils/errorHandler";

/* Action to create batch */
export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (departmentData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please login."); 
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/department/createdepartment",
        departmentData,
        config
      );
      return data.department;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage); 
    }
  }
);

/* Action to fetch batch data */

export const fetchDepartment = createAsyncThunk(
  "department/fetchDepartment",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/department/all');
      return data.getAllDepartmet;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred'; 
      return rejectWithValue(errorMessage); 
    }
  }
);

/* Action to update a batch */
export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async ({ id, departmentData }, {rejectWithValue }) => {
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

      const { data } = await axios.put(`http://localhost:8000/api/department/updatedept/${id}`, departmentData, config);

      return data.department;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

/* Action to delete a batch */
export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
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

      await axios.delete(`http://localhost:8000/api/department/delete/${id}`, config);
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);    }
  }
);

