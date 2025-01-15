import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostState {
  post: Object | null;
  error: Object | null;
  lastPage: int;
}

const initialState: PostState = {
  post: null,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    readPostSuccess: (state, { payload }: PayloadAction<object>) => ({
      ...state,
      post: payload,
    }),
    readPostFailure: (state, { payload }: PayloadAction<object>) => ({
      ...state,
      error: payload,
    }),
    unloadPost: () => initialState,
  },
});

export const { readPostSuccess, readPostFailure, unloadPost } =
  postSlice.actions;
export default postSlice.reducer;
