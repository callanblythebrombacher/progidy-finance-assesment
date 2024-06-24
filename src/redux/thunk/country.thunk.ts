import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosApi from '../../utils/axios.ts';
import {Normalize} from '../../utils/noramlize.ts';

const axiosApi = new AxiosApi();
const normalize = new Normalize();

export const countryThunk = createAsyncThunk(
  'country/fetch',
  async (arg: void, thunkAPI) => {
    try {
      const response = await axiosApi.initializeApiRequest('getCountryData');
      const normalizedData = normalize.getCountryData(response.data);
      console.log(JSON.stringify(normalizedData, null, 2));
      return thunkAPI.fulfillWithValue(normalizedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
