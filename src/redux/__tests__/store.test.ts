import {configureStore} from '@reduxjs/toolkit';
import countryReducer from '../reducers/country.slice.ts';
import {store, RootState, AppDispatch} from '../store';

import {describe, it, expect} from '@jest/globals';

describe('Redux Store', () => {
  it('should configure the store with countryReducer', () => {
    const testStore = configureStore({
      reducer: {
        countryReducer,
      },
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          serializableCheck: false,
        });
      },
    });

    expect(testStore.getState().countryReducer).toBeDefined();
  });

  it('should have the correct initial state for countryReducer', () => {
    expect(store.getState().countryReducer).toEqual({
      data: null,
      error: null,
      pending: false,
      deletionEvent: false,
    });
  });

  it('should have the correct types for RootState and AppDispatch', () => {
    const state: RootState = store.getState();
    const dispatch: AppDispatch = store.dispatch;

    expect(state.countryReducer).toBeDefined();
    expect(typeof dispatch).toBe('function');
  });

  it('should use custom middleware configuration', () => {
    const testStore = configureStore({
      reducer: {
        countryReducer,
      },
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          serializableCheck: false,
        });
      },
    });

    const middlewares = testStore.middleware;

    expect(
      middlewares.some(
        middleware => middleware.name === 'immutableStateInvariantMiddleware',
      ),
    ).toBe(false); // Example check: serializableCheck middleware should be false
  });
});
