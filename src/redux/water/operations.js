import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://dark-side-of-the-app01.onrender.com';


export const updatePortionThunk = createAsyncThunk(
  'water/updatePortion',
  async ({ id, volume, date }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/water/${id}`, {
        volume,
        date,
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


export const fetchMonthlyPortionsThunk = createAsyncThunk(
  'water/fetchWaterByMonth',
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/water/month`, {
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
  'water/fetchWaterByDay',
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/water/daily`, {
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


export const updateWaterRateThunk = createAsyncThunk(
  'water/updateWaterRate',
  async (newDailyNorma, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/water/daily-rate`,
        newDailyNorma
      );

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
