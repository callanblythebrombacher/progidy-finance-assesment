import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios'; // AxiosResponse is not used in this file
import type {RootState} from '../store';
import {countryThunk} from '../thunk/country.thunk'; // Remove '.ts' extension
import {CountrySliceStateInterface} from '../../interfaces/countrySliceState.interface'; // Remove '.ts' extension

// Define initial state for the country slice
const initialState: CountrySliceStateInterface = {
  data: null, // Initial state for country data is null
  error: null, // Initial state for error is null
  pending: false, // Initial state for pending is false
  deletionEvent: false, // if a deletion event occurs this flag is used to prevent a pagination reset
};

// Create the country slice using createSlice from Redux Toolkit
export const countrySlice = createSlice({
  name: 'country', // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer function for soft delete action
    softDelete(state, action: PayloadAction<string>) {
      const itemToSoftDelete = action.payload; // Get payload from action
      if (state.data) {
        state.deletionEvent = true;
        // Check if state.data exists
        state.data = state.data.map(
          countryItem =>
            countryItem.name === itemToSoftDelete
              ? {...countryItem, isActive: false} // Set isActive to false for matching item
              : countryItem, // Return unchanged item for non-matching items
        );
      }
    },
    resetDeletionEvent(state) {
      state.deletionEvent = false;
    },
  },
  // Extra reducers for handling async actions using createAsyncThunk
  extraReducers: builder => {
    builder
      .addCase(countryThunk.pending, (state, action) => {
        // Handle pending state for countryThunk
        state.pending = true; // Set pending to true
      })
      .addCase(countryThunk.fulfilled, (state, action: PayloadAction<any>) => {
        // Handle fulfilled state for countryThunk
        state.pending = false; // Set pending to false
        const payload = action.payload; // Extract payload from action
        state.data = payload; // Update state with fetched data
      })
      .addCase(countryThunk.rejected, (state, action: PayloadAction<any>) => {
        // Handle rejected state for countryThunk
        state.pending = false; // Set pending to false
        if ('message' in action.payload) {
          const payload: AxiosError = action.payload; // Typecast action.payload to AxiosError
          state.error = payload.message; // Set error message in state
        }
      });
  },
});

// Export action creators from the country slice
export const {softDelete, resetDeletionEvent} = countrySlice.actions;

// Selector function to retrieve country data from the Redux state
export const selectCountryData = (state: RootState) =>
  state.countryReducer.data;

// Export the reducer function from the country slice
export default countrySlice.reducer;
