import { createSlice } from '@reduxjs/toolkit';
import { createBatch, fetchBatches, updateBatch,deleteBatch } from '../actions/batchActions.js';

const initialState = {
  batches: [],
  loading: false,
  error: null,
};

const batchkSlice = createSlice({
  name: 'batch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Book
      .addCase(createBatch.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(createBatch.fulfilled, (state, action) => {
        state.loading = false;
        // state.books.push(action.payload);
        state.batches = [...state.batches, action.payload];
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Books
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Book
      .addCase(updateBatch.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(updateBatch.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.batches.findIndex((batch) => batch._id === action.payload._id);
        if (index !== -1) {
          state.batches[index] = action.payload;
        }
      })
      .addCase(updateBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Book
      .addCase(deleteBatch.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(deleteBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = state.batches.filter((batch) => batch._id !== action.payload);
      })
      .addCase(deleteBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default batchkSlice.reducer;
