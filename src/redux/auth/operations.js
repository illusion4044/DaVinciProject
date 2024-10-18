import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  '/auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk('/auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', user);
    const token = response.data.data.accessToken;

    setAuthHeader(token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
