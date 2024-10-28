import { createSlice } from '@reduxjs/toolkit';
import {
  updatePortionThunk,
  fetchMonthlyPortionsThunk,
  fetchDailyPortionsThunk,
  updateWaterRateThunk,
} from './operations.js';
import { number } from 'yup';

const initialState = {
  dailyNorma: 0,
  monthlyPortions: [],
  dailyPortions: [],
  percentPerDay: null,
  activeContent: 'pictureBottleBg',
  isLoading: false,
  isError: null,
  isOpenDailyNormaModal: false,
  isTodayModalOpen: false,
  selectedItem: {},
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    changeDailyNorma(state, action) {
      state.dailyNorma = action.payload;
    },
    changeActiveContent(state, action) {
      state.activeContent = action.payload;
    },
    clearNormaCounterData(state) {
      state.dailyNorma = 0;
      state.isLoading = false;
      state.isError = null;
    },
    openDailyModal: state => {
      state.isOpenDailyNormaModal = true;
    },
    openTodayModal: state => {
      state.isTodayModalOpen = true;
    },
    closeTodayModal: state => {
      state.isTodayModalOpen = false;
    },
    clearStatisticData: state => {
      state.dailyNorma = null;
      state.monthlyPortions = [];
      state.dailyPortions = [];
      state.isLoading = false;
      state.isError = null;
      state.selectedItem = null;
    },
    changeSelectedItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDailyPortionsThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchDailyPortionsThunk.fulfilled, (state, { payload }) => {
        state.dailyNorma = payload.result.dailyNorma;
        state.isLoading = false;
      })
      .addCase(fetchDailyPortionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(updatePortionThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updatePortionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyNorma = action.payload;
      })
      .addCase(updatePortionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchMonthlyPortionsThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchMonthlyPortionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlyPortions = action.payload;
      })
      .addCase(fetchMonthlyPortionsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(updateWaterRateThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateWaterRateThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateWaterRateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {
  changeDailyNorma,
  changeActiveContent,
  clearNormaCounterData,
  openDailyModal,
  openTodayModal,
  closeTodayModal,
  clearStatisticData,
  changeSelectedItem,
} = waterSlice.actions;

export default waterSlice.reducer;
