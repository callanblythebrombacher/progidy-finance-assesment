import {renderHook} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {useDispatch} from 'react-redux';
import useFetchCountryData from '../useFetchCountryData.ts';
import {countryThunk} from '../../redux/thunk/country.thunk.ts';
import {RootState} from '../../redux/store.ts';

import {jest, describe, beforeEach, expect, it} from '@jest/globals';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../redux/thunk/country.thunk.ts');

const middlewares = [thunk];
const mockStore = configureMockStore<RootState>(middlewares);

describe('useFetchCountryData hook', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      countryReducer: {
        data: [
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
            name: 'United Kingdom',
            flag: '🇬🇧',
            alpha2: 'GB',
            alpha3: 'GBR',
            currencyArray: [
              {currency: 'GBP', name: 'British Pound', symbol: '£'},
            ],
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
        ],
      },
    });
    (useDispatch as jest.Mock).mockReturnValue(store.dispatch);
    (countryThunk as jest.Mock).mockReturnValue({type: 'COUNTRY_THUNK'});
  });

  it('should dispatch countryThunk action and return country data from Redux store', async () => {
    const {result, waitForNextUpdate} = renderHook(
      () => useFetchCountryData(),
      {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      },
    );

    expect(store.dispatch).toHaveBeenCalledWith(countryThunk());
    await waitForNextUpdate();

    expect(result.current).toEqual([
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
        name: 'United Kingdom',
        flag: '🇬🇧',
        alpha2: 'GB',
        alpha3: 'GBR',
        currencyArray: [{currency: 'GBP', name: 'British Pound', symbol: '£'}],
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
    ]);
  });

  it('should return null if country data is not available', () => {
    store = mockStore({
      countryReducer: {
        data: null,
      },
    });

    const {result} = renderHook(() => useFetchCountryData(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBeNull();
  });
});
