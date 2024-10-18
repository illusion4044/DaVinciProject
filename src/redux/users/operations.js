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
