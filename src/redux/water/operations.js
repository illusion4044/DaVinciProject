import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://dark-side-of-the-app01.onrender.com';

export const updatePortionThunk = createAsyncThunk(
  'water/updatePortion',
  async ({ id, ...restCredentials }, { rejectWithValue }) => {
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
  async ({ id, newDailyNorma }, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue('ID is missing or undefined.');
    }
    try {
      const response = await axios.patch(`/water/${id}`, newDailyNorma);
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
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get('/water/month', {
        params: { date },
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
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get('/water/day', {
        params: { date },
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
