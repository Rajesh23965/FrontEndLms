
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import { handleError } from "../../utils/errorHandler";

/* Action to create batch */
export const createBatch = createAsyncThunk(
  'batch/createBatch',
  async (batchData,{rejectWithValue}) => {
    
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
      const {data }= await axios.post('http://localhost:8000/api/batch/createbatch', batchData, config);
     return data.batch 
  
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage); 

    }
  }
);

/* Action to fetch batch data */

export const fetchBatches = createAsyncThunk(
    'batch/fetchBatches',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:8000/api/batch/getall');
        return response.data.getAllBatch; 
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred'; 
        return rejectWithValue(errorMessage);       }
    }
  );
  
 /* Action to update a batch */
 export const updateBatch = createAsyncThunk(
  'batch/updateBatch',
  async ({ id, batchData }, { rejectWithValue }) => {
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

      // Log the data being sent
      console.log('Updating Batch with ID:', id);
      console.log('Batch Data:', batchData);

      const { data } = await axios.put(
        `http://localhost:8000/api/batch/update/${id}`,
        batchData,
        config
      );

      // Log the response from the server
      console.log('Update Response:', data);

      return data.batch;
    } catch (error) {
      console.error('Error updating batch:', error); // Log the error for better debugging
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

/* Action to delete a batch */
export const deleteBatch = createAsyncThunk(
    'batch/deleteBatch',
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
        
        await axios.delete(`http://localhost:8000/api/batch/delete/${id}`,config);
     return id;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        return rejectWithValue(errorMessage);    
      }
    }
  );
  


