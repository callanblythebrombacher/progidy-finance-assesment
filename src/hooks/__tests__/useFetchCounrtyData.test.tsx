import React from 'react';
import {renderHook} from '@testing-library/react-native';
import {Provider, useDispatch} from 'react-redux';
import * as reactRedux from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import useFetchCountryData from '../useFetchCountryData';
import {jest, describe, beforeEach, expect, it} from '@jest/globals';

const mockStore = configureMockStore([reactRedux.thunk]);

describe('useFetchCountryData hook', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  jest.mock('react-redux', () => ({
    useSelector: () => mockSelector,
    useDispatch: () => mockDispatch,
  }));

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
  });

  it('should dispatch countryThunk action and return country data from Redux store', async () => {
    const {result} = renderHook(() => useFetchCountryData(), {
      wrapper: ({
        children,
      }: {
        children: React.ReactNode[] | React.ReactNode;
      }) => <Provider store={store}>{children}</Provider>,
    });

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
      wrapper: ({
        children,
      }: {
        children: React.ReactNode[] | React.ReactNode;
      }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBeNull();
  });
});
