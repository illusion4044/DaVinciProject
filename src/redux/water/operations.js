import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

axios.defaults.baseURL = 'https://dark-side-of-the-app01.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const updatePortionThunk = createAsyncThunk(
  'water/updatePortion',
  async ({ id, ...restCredentials }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);

    if (!id) {
      return rejectWithValue('ID is missing or undefined.');
    }
    try {
      const response = await axios.patch(`/water/${id}`, restCredentials);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const updateWaterRateThunk = createAsyncThunk(
  'water/updateWaterRate',
  async ({ dailyNorma }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }
    setAuthHeader(token);
    try {
      const response = await axios.patch(`/users/norm`, {dailyNorma});
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const fetchMonthlyPortionsThunk = createAsyncThunk(
  'water/fetchWaterByMonth',
  async (date, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);

    const formattedDate = format(new Date(date), 'yyyy-MM-dd');

    try {
      const response = await axios.get('/water/month', {
        params: { date: formattedDate },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const fetchDailyPortionsThunk = createAsyncThunk(
  'water/fetchDailyPortions',
  async (date, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    try {
      const response = await axios.get('/water/day', {
        params: { date: formattedDate },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


export const addWaterPortionThunk = createAsyncThunk(
  'water/addWaterPortion',
  async ({ date, volume }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);

    const formattedDate = format(new Date(date), 'yyyy-MM-dd');

    try {
      const response = await axios.post('/water', {
        date: formattedDate,
        volume,
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);
