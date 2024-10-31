import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dark-side-of-the-app01.onrender.com';
axios.defaults.baseURL = API_URL;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Upload User Photo
export const uploadUserPhoto = createAsyncThunk(
  'users/uploadPhoto',
  async ({ photo, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      const response = await axios.post('/users/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 401
          ? 'Unauthorized. Please log in.'
          : error.response?.status === 404
          ? 'User not found.'
          : 'Failed to upload photo.';
      return rejectWithValue(message);
    }
  }
);

// Update User Info
export const updateUserInfo = createAsyncThunk(
  'users/updateInfo',
  async (
    { name, email, gender, password, newPassword },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        ...(name && { name }),
        ...(email && { email }),
        ...(gender && { gender }),
      };
      if (newPassword) {
        data.password = newPassword;
      }

      const response = await axios.patch('/users', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.status === 400
          ? 'New password cannot be the same as the old password.'
          : error.response?.status === 401
          ? 'Unauthorized access. Please log in again.'
          : 'Failed to update user information.';
      return rejectWithValue(message);
    }
  }
);

// Get Current User
export const getCurrentUser = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    setAuthHeader(token);

    try {
      const response = await axios.get('/users');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
