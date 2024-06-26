import {configureStore} from '@reduxjs/toolkit';
import {countryThunk} from '../country.thunk.ts';
import axios from 'axios';
import {Normalize} from '../../../utils/normalize.ts';
import countryReducer from '../../reducers/country.slice.ts';

import {beforeEach, describe, expect, it, jest} from '@jest/globals';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;
describe('countryThunk', () => {
  let store: any;

  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({
      reducer: {
        country: countryReducer,
      },
    });
  });

  it('dispatches fulfilled action with normalized data when API call succeeds', async () => {
    const mockResponse = {
      data: [
        {
          name: 'United States',
          flag: '🇺🇸',
          cca2: 'US',
          cca3: 'USA',
          currencies: {USD: {name: 'US Dollar', symbol: '$'}},
        },
        {
          name: 'Canada',
          flag: '🇨🇦',
          cca2: 'CA',
          cca3: 'CAN',
          currencies: {CAD: {name: 'Canadian Dollar', symbol: 'CA$'}},
        },
      ],
    };
    const normalizedData = [
      {
        isActive: true,
        name: 'United States',
        flag: '🇺🇸',
        alpha2: 'US',
        alpha3: 'USA',
        currencyArray: [{currency: 'USD', name: 'US Dollar', symbol: '$'}],
      },
      {
        isActive: true,
        name: 'Canada',
        flag: '🇨🇦',
        alpha2: 'CA',
        alpha3: 'CAN',
        currencyArray: [
          {currency: 'CAD', name: 'Canadian Dollar', symbol: 'CA$'},
        ],
      },
    ];
    Normalize.prototype.getCountryData = jest
      .fn()
      .mockReturnValue(normalizedData);
    mockAxios.request.mockResolvedValue(mockResponse);

    await store.dispatch(countryThunk()).then(() => {
      const state = store.getState();
      expect(state.country.pending).toBe(false);
      expect(state.country.error).toBeNull();
      expect(state.country.data).toEqual(normalizedData);
    });
  });

  it('dispatches rejected action with error message when API call fails', async () => {
    const error = new Error('Network Error');
    mockAxios.request.mockRejectedValue(error);

    await store.dispatch(countryThunk());

    const state = store.getState();
    expect(state.country.pending).toBe(false);
    expect(state.country.error).toBe('Network Error');
    expect(state.country.data).toEqual(null);
  });
});
