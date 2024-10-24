import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dark-side-of-the-app01.onrender.com';

export const fetchLiters = createAsyncThunk(
  'auth/register',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/auth/register');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

axios.defaults.baseURL = 'https://dark-side-of-the-app01.onrender.com';

// export const fetchLiters = createAsyncThunk(
//   'auth/register',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/auth/register');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.massage);
//     }
//   }
// );

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.patch('/api/user', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update user'
      );
    }
  }
);

// get/users header //

export const getUser = createAsyncThunk('users', async (token, thunkAPI) => {
  try {
    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
