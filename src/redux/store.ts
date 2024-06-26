import {combineReducers, configureStore} from '@reduxjs/toolkit';
import countryReducer from './reducers/country.slice.ts';

export const rootReducer = combineReducers({
  countryReducer,
  // Add other reducers as needed
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
