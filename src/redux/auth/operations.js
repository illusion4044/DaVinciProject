import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://dark-side-of-the-app01.onrender.com';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  '/auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/signup', newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  '/auth/logIn',
  async (users, thunkAPI) => {
    console.log(users);
    const { email, password } = users;
    try {
      // const response = await axios.post('/auth/signin', user);
      const response = await axios.post('/auth/signin', {
        email: email,
        password: password,
      });
      console.log(response.data);
      const token = response.data.data.accessToken;

      setAuthHeader(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/signout');
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    clearAuthHeader();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});