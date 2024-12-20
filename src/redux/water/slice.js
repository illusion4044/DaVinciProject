import { createSlice } from '@reduxjs/toolkit';
import {
  updatePortionThunk,
  fetchMonthlyPortionsThunk,
  fetchDailyPortionsThunk,
  updateWaterRateThunk,
  addWaterPortionThunk,
  deletePortionThunk,
} from './operations.js';
import { number, object } from 'yup';
import dayjs from 'dayjs';
import { logOut } from '../auth/operations.js';

const initialState = {
  dailyNorma: 1500,
  monthlyPortions: [],
  dailyPortions: [],
  percentPerDay: null,
  activeContent: 'pictureBottleBg',
  isLoading: false,
  isError: null,
  isOpenDailyNormaModal: false,
  isTodayModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
  selectedItem: {},
  selectedTime: dayjs().format('HH:mm'),
  selectedAmount: 0,
  totalVolume: 0,
  newDailyNorma: 0,
  volume: 0,
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
    openAddModal: state => {
      state.isAddModalOpen = true;
    },
    closeAddModal: state => {
      state.isAddModalOpen = false;
    },
    openDeleteModal: state => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: state => {
      state.isDeleteModalOpen = false;
    },
    setSelectedTime(state, action) {
      state.selectedTime = action.payload; // Update selected time
    },
    setSelectedAmount(state, action) {
      state.selectedAmount = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDailyPortionsThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchDailyPortionsThunk.fulfilled, (state, { payload }) => {
        // state.dailyNorma = payload.result.dailyNorma;
        state.percentPerDay = payload.percentPerDay;
        // state.dailyPortions = payload.servings;
        // state.totalVolume = payload.result.dailyPortions.reduce(
        //   (sum, portion) => sum + portion.volume,
        //   0
        // );
        state.totalVolume = payload.totalWaterPerDay;
        state.isLoading = false;
        state.dailyPortions = payload.data;
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
        const updatedPortion = action.payload;
        console.log(action.payload)
        state.dailyPortions = state.dailyPortions.map(portion =>
          portion._id === updatedPortion._id ? updatedPortion : portion
        );
        state.totalVolume = state.dailyPortions.reduce(
          (sum, portion) => sum + portion.volume,
          0
        );
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
        console.log(action.payload);
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
        console.log(action.payload)
        state.dailyNorma = action.payload.dailyNorm;
      })
      .addCase(updateWaterRateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(addWaterPortionThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })

      .addCase(addWaterPortionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyPortions.push(action.payload);
        state.totalVolume += action.payload.volume;
        state.volume = action.payload.data.volume;
      })
      .addCase(logOut.fulfilled, () => {
        return {
          ...initialState,
        };
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
  setSelectedItem,
  setSelectedTime,
  setSelectedAmount,
  newDailyNorma,
  volume,
  setDailyPortions,
  openAddModal,
  closeAddModal,
  openDeleteModal,
  closeDeleteModal,
} = waterSlice.actions;

export default waterSlice.reducer;
