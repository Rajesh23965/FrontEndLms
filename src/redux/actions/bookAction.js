import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils/auth";
import { handleError } from "../../utils/errorHandler";

/* Action to create a book */
export const createBook = createAsyncThunk(
  'book/createBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      console.log(token)
      if (!token) {
        return rejectWithValue("No token found. Please login.");
      }

      const formData = new FormData();
      Object.entries(bookData).forEach(([key, value]) => {
        if (key === 'files') {
          value.forEach((file) => formData.append('files', file));
        } else {
          formData.append(key, value);
        }
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('http://localhost:8000/api/books/create', formData, config);
      return data.book;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


/* Action to fetch all books */
export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please login.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get('http://localhost:8000/api/books/all', config);
      return data; // Assuming your backend returns { books: [...] }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

/* Action to update a book */
export const updateBook = createAsyncThunk(
  'book/updateBook',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please login.");
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`http://localhost:8000/api/books/update/${id}`, bookData, config);
      return data.book;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

/* Action to delete a book */
export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please login.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:8000/api/books/delete/${id}`, config);
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

