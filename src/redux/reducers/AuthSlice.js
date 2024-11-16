


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';
// import { getAuthToken } from "../../utils/auth";


// // Async thunk for creating a new user
// export const createUser = createAsyncThunk(
//   'auth/createUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         return rejectWithValue('No token found. Please login.'); // Handle missing token
//       }

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
      
//       const { data } = await axios.post('http://localhost:8000/api/users/create', userData, config);
//       console.log("Submitting user data:", userData);

//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message || 'An error occurred'; // Handle error message
//       // return rejectWithValue(errorMessage); // Ensure proper error is passed
//       console.log("Error creating user:", error.response ? error.response.data : error);

//     }
//   }
// );

// /* Action to fetch user */
// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get('http://localhost:8000/api/users/all'); // Ensure the URL is correct
//       return data; // Make sure to return the fetched data
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );


  

// // Async thunk for updating a user
// export const updateUser = createAsyncThunk('auth/updateUser', async (userData, { rejectWithValue }) => {
//   try {
//     const config = getConfig();
//     const response = await axios.put(`http://localhost:8000/api/users/${userData.id}`, userData.userData, config);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// // Logout action
// export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
//   try {
//     await axios.post('http://localhost:8000/api/users/logout');
//     localStorage.removeItem('token');
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// /* Action to delete User */
// export const deleteUser = createAsyncThunk(
//   'auth/deleteUser',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         return rejectWithValue('No token found. Please login.');
//       }

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.delete(`http://localhost:8000/api/users/${id}`, config);
//       return id;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Redux slice for authentication
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     loading: false,
//     error: null,
//     users: [], // State to store the fetched user list
//     user: null,
//     token: localStorage.getItem('token') || null,
//   },
//   reducers: {
//     SetUser: (state, action) => {
//       state.user = action.payload;
//     },
//     Logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//    .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null; 
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(createUser.pending, (state) => { state.loading = true; })
//       .addCase(createUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users.push(action.payload); // Add the new user to users array
//       })
//       .addCase(createUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUser.pending, (state) => { state.loading = true; })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         // Update the existing user in the state
//         state.users = state.users.map(user => 
//           user._id === action.payload._id ? action.payload : user
//         );
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteUser.pending, (state) => { state.loading = true; })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.loading = false;
//         // Remove the deleted user from the state
//         state.users = state.users.filter(user => user._id !== action.payload);
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.users = []; // Clear the user list on logout
//       });
//   },
// });

// export const { SetUser, Logout } = authSlice.actions;
// export default authSlice.reducer;
