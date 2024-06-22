import {configureStore} from '@reduxjs/toolkit';
import countryReducer from './reducers/country.slice.ts';

export const store = configureStore({
  reducer: {
    countryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
