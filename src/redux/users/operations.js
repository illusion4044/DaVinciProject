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

export const uploadUserPhoto = createAsyncThunk(
  'user/uploadPhoto',
  async ({ photo, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

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
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return rejectWithValue('Unauthorized. Please log in.');
        }
        if (error.response.status === 404) {
          return rejectWithValue('User not found.');
        }
        if (error.response.status === 500) {
          return rejectWithValue('Server error. Please try again later.');
        }
      }
      return rejectWithValue('Failed to upload photo.');
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateInfo',
  async (
    { id, name, email, gender, password, newPassword, token },
    { rejectWithValue }
  ) => {
    try {
      const data = {};
      if (name) data.name = name;
      if (email) data.email = email;
      if (gender) data.gender = gender;

      if (password && newPassword) {
        data.password = password;
        data.newPassword = newPassword;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.patch(
        `${API_URL}/users/${id}`,
        data,
        config
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return rejectWithValue(
            'New password cannot be the same as the old password.'
          );
        }
        if (error.response.status === 401) {
          return rejectWithValue('Unauthorized access. Please log in again.');
        }
        if (error.response.status === 404) {
          return rejectWithValue('User not found.');
        }
        if (error.response.status === 500) {
          return rejectWithValue(
            'Internal Server Error. Please try again later.'
          );
        }
      }
      return rejectWithValue('Failed to update user information.');
    }
  }
);

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
