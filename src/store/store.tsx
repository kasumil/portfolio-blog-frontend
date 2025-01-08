import { configureStore } from '@reduxjs/toolkit';
import authReducer from './module/auth';
import { apiSlice } from '@/lib/api/client';
import useReducer from './module/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: useReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
