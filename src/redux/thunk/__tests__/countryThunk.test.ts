import {configureStore} from '@reduxjs/toolkit';
import {countryThunk} from '../country.thunk.ts';
import axios from 'axios';
import {Normalize} from '../../../utils/normalize.ts';
import countryReducer from '../../reducers/country.slice.ts';

import {jest, describe, expect, beforeEach, it} from '@jest/globals';

jest.mock('axios');
jest.mock('../src/utils/normalize.ts');

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockNormalize = new Normalize() as jest.Mocked<Normalize>;

describe('countryThunk', () => {
  const store = configureStore({
    reducer: {
      country: countryReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
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

    mockAxios.request.mockResolvedValue(mockResponse);
    mockNormalize.getCountryData.mockReturnValue(normalizedData);

    await store.dispatch(countryThunk());

    const actions = store.getActions();
    expect(actions[0].type).toBe('country/fetch/pending');
    expect(actions[1].type).toBe('country/fetch/fulfilled');
    expect(actions[1].payload).toEqual(normalizedData);
  });

  it('dispatches rejected action with error message when API call fails', async () => {
    const error = new Error('Network Error');
    mockAxios.request.mockRejectedValue(error);

    await store.dispatch(countryThunk());

    const actions = store.getActions();
    expect(actions[0].type).toBe('country/fetch/pending');
    expect(actions[1].type).toBe('country/fetch/rejected');
    expect(actions[1].error.message).toBe('Network Error');
  });
});
