import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosApi from '../../utils/axios.ts';

const axiosApi = new AxiosApi();

export const countryThunk = createAsyncThunk(
  'country/fetch',
  async (arg: void, thunkAPI) => {
    try {
      const response = await axiosApi.initializeApiRequest('getCountryData');
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
