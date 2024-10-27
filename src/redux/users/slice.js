import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  updateUserInfo,
  uploadUserPhoto,
} from './operations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
    user: {
      _id: null,
      name: null,
      email: null,
      photo: null,
      dailyNorm: 0,
      dailyWaterIntake: 0,
      gender: '',
    },
  },
  extraReducers: builder =>
    builder
      .addCase(updateUserInfo.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data };
        state.loading = false;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(uploadUserPhoto.pending, state => {
        state.loading = true;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.user.photo = action.payload.data.user.photo;
        state.loading = false;
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Refresh User
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log('action.payload:', action.payload);
        state.user = { ...state.user, ...action.payload };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isRefreshing = false;
      }),
});

export default usersSlice.reducer;
