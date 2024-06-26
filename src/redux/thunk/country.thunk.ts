import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosApi from '../../utils/axios.ts'; // Import AxiosApi from axios utility file
import {Normalize} from '../../utils/normalize.ts'; // Import Normalize class from normalize utility file

const axiosApi = new AxiosApi(); // Instantiate AxiosApi for making API requests
const normalize = new Normalize(); // Instantiate Normalize for normalizing data

// Define createAsyncThunk to fetch country data asynchronously
export const countryThunk = createAsyncThunk(
  'country/fetch', // Action type string for tracking in Redux DevTools
  async (arg: void, thunkAPI) => {
    // Payload creator function with arg and thunkAPI
    try {
      // Try to make an API request to fetch country data
      const response = await axiosApi.initializeApiRequest('getCountryData'); // Use AxiosApi instance to fetch data
      const normalizedData = normalize.getCountryData(response.data); // Normalize fetched data using Normalize class
      console.log(normalizedData);
      return thunkAPI.fulfillWithValue(normalizedData); // Return fulfilled action with normalized data
    } catch (error) {
      // Catch any errors that occur during API request or normalization
      return thunkAPI.rejectWithValue(error); // Return rejected action with error message
    }
  },
);
