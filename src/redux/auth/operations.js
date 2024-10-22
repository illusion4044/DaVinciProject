import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://dark-side-of-the-app01.onrender.com";

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  '/auth/signup',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/signup', newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk('/auth/signin', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/signin', user);
    const token = response.data.token;

    setAuthHeader(token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  '/auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('No token found');
    }

    setAuthHeader(persistedToken);

    try {
      const response = await axios.get('/auth/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
    'auth/signout',
    async (_, thunkAPI) => {
        try {
            await axios.post('/auth/signout');
            localStorage.removeItem('token');
            setAuthHeader("");
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
