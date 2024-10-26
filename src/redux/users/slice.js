import { createSlice } from '@reduxjs/toolkit';
// import { fetchLiters } from './operations.js';

import { updateUserInfo, uploadUserPhoto, getUser  } from './operations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
    user: {},
  },
  extraReducers: builder =>
    builder
      // .addCase(fetchLiters.pending, state => {
      //   state.loading = true;
      //   state.error = false;
      // })
      // .addCase(fetchLiters.fulfilled, (state, action) => {
      //   state.items = action.payload;
      //   state.loading = false;
      // })
      // .addCase(fetchLiters.rejected, state => {
      //   state.error = true;
      //   state.loading = false;
      // })
      // Handle updateUserInfo for updating user information
      // Handle updateUserInfo for updating user information
      .addCase(updateUserInfo.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.items = state.items.map(user =>
          user._id === action.payload.data._id ? action.payload.data : user
        );
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
        state.items = state.items.map(user =>
          user._id === action.payload.data.user._id
            ? action.payload.data.user
            : user
        );
        state.loading = false;
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getUser.pending, state => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});
export default usersSlice.reducer;
