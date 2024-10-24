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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    { photo, gender, name, email, password, newPassword, token },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      if (photo) {
        formData.append('photo', photo);
      }

      formData.append('gender', gender);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password || '');
      formData.append('newPassword', newPassword || '');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/users/photo`,
        formData,
        config
      );

      if (response.status === 200) {
        return response.data;
      }

      if (response.status === 400) {
        return rejectWithValue(
          'New password cannot be the same as the old password'
        );
      }

      if (response.status === 401) {
        return rejectWithValue('Unauthorized. Please log in again.');
      }

      if (response.status === 404) {
        return rejectWithValue('User not found.');
      }

      if (response.status === 500) {
        return rejectWithValue(
          'Internal server error. Please try again later.'
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update user'
      );
    }
  }
);
