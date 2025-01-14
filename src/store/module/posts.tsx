import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface listType {
  posts: any[] | null;
  error: any[] | null;
  lastPage: number;
}

const initialState: listType = {
  posts: null,
  error: null,
  lastPage: 1,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    listSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      posts: payload.posts,
      lastPage: payload.lastPage,
    }),
    listFailure: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      error: payload,
    }),
  },
});

export const { listFailure, listSuccess } = postsSlice.actions;

export default postsSlice.reducer;
