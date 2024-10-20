import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.patch('/api/user', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
