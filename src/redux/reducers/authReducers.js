import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  logoutUser,
} from "../actions/authAction.js";

const initialState = {
  users: [],
  loading: false,
  error: null,
  // token: localStorage.getItem("token") || null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.users = action.payload;
    },
    Logout: (state) => {
      state.users = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      setTimeout(() => {
        state.loading = false;
        state.users = action.payload;
      }, 1000); // 1 second delay for debugging
    })
    
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false; // Make sure loading is set to false here as well
      state.error = action.payload;
    })
    

      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.token = null;
        state.users = [];
      });
  },
});

export const { SetUser, Logout } = authSlice.actions;

export default authSlice.reducer;
