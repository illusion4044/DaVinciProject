import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  updateUserInfo,
  uploadUserPhoto,
} from './operations.js';
import { logOut } from '../auth/operations.js';

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
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update user info';
        state.loading = false;
      })

      .addCase(uploadUserPhoto.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.user.photo = action.payload.data;
        console.log('Action payload', action.payload);
        state.loading = false;
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.error = action.payload || 'Failed to upload photo';
        state.loading = false;
      })

      // Refresh User
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload || 'Failed to refresh user';
      })
      .addCase(logOut.fulfilled, () => {
        return {
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
        };
      }),
});

export default usersSlice.reducer;
