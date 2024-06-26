import {configureStore} from '@reduxjs/toolkit';
import countryReducer, {
  countrySlice,
  softDelete,
  resetDeletionEvent,
  selectCountryData,
} from '../../reducers/country.slice.ts';
import {countryThunk} from '../../thunk/country.thunk';
import {CountrySliceStateInterface} from '../../../interfaces/countrySliceState.interface';
import {AxiosError} from 'axios';

import {describe, beforeEach, expect, it} from '@jest/globals';

describe('countrySlice', () => {
  let initialState: CountrySliceStateInterface;

  beforeEach(() => {
    initialState = {
      data: [
        {name: 'United States', isActive: true},
        {name: 'Canada', isActive: true},
        {name: 'United Kingdom', isActive: true},
      ],
      error: null,
      pending: false,
      deletionEvent: false,
    };
  });

  it('should handle initial state', () => {
    expect(countryReducer(undefined, {type: 'unknown'})).toEqual({
      data: null,
      error: null,
      pending: false,
      deletionEvent: false,
    });
  });

  it('should handle softDelete', () => {
    const actual = countryReducer(initialState, softDelete('Canada'));
    expect(actual.data).toEqual([
      {name: 'United States', isActive: true},
      {name: 'Canada', isActive: false},
      {name: 'United Kingdom', isActive: true},
    ]);
    expect(actual.deletionEvent).toBe(true);
  });

  it('should handle resetDeletionEvent', () => {
    initialState.deletionEvent = true;
    const actual = countryReducer(initialState, resetDeletionEvent());
    expect(actual.deletionEvent).toBe(false);
  });

  it('should handle countryThunk pending', () => {
    const action = {type: countryThunk.pending.type};
    const actual = countryReducer(initialState, action);
    expect(actual.pending).toBe(true);
  });

  it('should handle countryThunk fulfilled', () => {
    const newData = [
      {name: 'Australia', isActive: true},
      {name: 'New Zealand', isActive: true},
    ];
    const action = {type: countryThunk.fulfilled.type, payload: newData};
    const actual = countryReducer(initialState, action);
    expect(actual.pending).toBe(false);
    expect(actual.data).toEqual(newData);
  });

  it('should handle countryThunk rejected', () => {
    const error: AxiosError = {
      name: 'AxiosError',
      message: 'Network Error',
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    };
    const action = {type: countryThunk.rejected.type, payload: error};
    const actual = countryReducer(initialState, action);
    expect(actual.pending).toBe(false);
    expect(actual.error).toEqual('Network Error');
  });

  it('should select country data', () => {
    const state = {countryReducer: initialState};
    expect(selectCountryData(state)).toEqual(initialState.data);
  });
});
