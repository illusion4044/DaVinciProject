import { createSlice } from '@reduxjs/toolkit';
import { updateUserInfo, uploadUserPhoto } from './operations.js';

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
    },
  },
  extraReducers: builder =>
    builder
      .addCase(updateUserInfo.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data;
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
      }),
});

export default usersSlice.reducer;
