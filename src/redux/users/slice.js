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
      // 13-26
      // .addCase(uploadUserPhoto.fulfilled, (state, action) => {
      //   state.user.photo = action.payload.data.photo;
      //   console.log('Upload photo response payload:', action.payload);
      //   console.log(
      //     'Updated user state:',
      //     JSON.parse(JSON.stringify(state.user))
      //   );
      //   state.loading = false;
      // })
      // 10-02
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.user.photo = action.payload.data; // Adjust to match the exact path to the photo URL in your response
        console.log('Action payload', action.payload);

        state.loading = false;
      })
      // 9-45
      // .addCase(uploadUserPhoto.fulfilled, (state, action) => {
      //   state.user.photo = action.payload.data.photo;
      //   console.log(state.user.photo);
      //   state.loading = false;
      // })
      //leter version
      // .addCase(uploadUserPhoto.fulfilled, (state, action) => {
      //   state.user.photo = action.payload.data.user.photo;
      //   state.loading = false;
      // })
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
      }),
});

export default usersSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import {
//   getCurrentUser,
//   updateUserInfo,
//   uploadUserPhoto,
// } from './operations.js';

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//     user: {
//       _id: null,
//       name: null,
//       email: null,
//       photo: null,
//       dailyNorm: 0,
//       dailyWaterIntake: 0,
//       gender: '',
//     },
//   },
//   extraReducers: builder =>
//     builder
//       .addCase(updateUserInfo.pending, state => {
//         state.loading = true;
//       })
//       .addCase(updateUserInfo.fulfilled, (state, action) => {
//         state.user = { ...state.user, ...action.payload.data };
//         state.loading = false;
//       })
//       .addCase(updateUserInfo.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })

//       .addCase(uploadUserPhoto.pending, state => {
//         state.loading = true;
//       })
//       .addCase(uploadUserPhoto.fulfilled, (state, action) => {
//         state.user.photo = action.payload.data.user.photo;
//         state.loading = false;
//       })
//       .addCase(uploadUserPhoto.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//       // Refresh User
//       .addCase(getCurrentUser.pending, state => {
//         state.isRefreshing = true;
//       })

//       .addCase(getCurrentUser.fulfilled, (state, action) => {
//         state.user = { ...state.user, ...action.payload };
//         state.isLoggedIn = true;
//         state.isRefreshing = false;
//       })
//       .addCase(getCurrentUser.rejected, state => {
//         state.isRefreshing = false;
//       }),
// });

// export default usersSlice.reducer;
