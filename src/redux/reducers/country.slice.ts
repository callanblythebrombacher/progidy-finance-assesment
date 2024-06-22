import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError, AxiosResponse} from 'axios';
import type {RootState} from '../store';
import {countryThunk} from '../thunk/country.thunk.ts';
import {CountrySliceStateInterface} from '../../interfaces/countrySliceState.interface.ts';

const initialState: CountrySliceStateInterface = {
  data: null,
  error: null,
  pending: false,
};
export const countrySlice = createSlice({
  name: 'country',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    softDelete(state, payload: PayloadAction<any>) {},
  },
  extraReducers: builder => {
    builder
      .addCase(countryThunk.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(countryThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.pending = false;
        const payload = action.payload;
        state.data = payload;
      })
      .addCase(countryThunk.rejected, (state, action: PayloadAction<any>) => {
        state.pending = false;
        if ('message' in action.payload) {
          const payload: AxiosError = action.payload;
          state.error = payload.message;
        }
      });
  },
});

export const {softDelete} = countrySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCountryData = (state: RootState) =>
  state.countryReducer.data;

export default countrySlice.reducer;
