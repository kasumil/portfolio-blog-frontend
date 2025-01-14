import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeField } from './auth';

export interface WriteState {
  title: string | null;
  body: string | null;
  tags: Array | null;
  post: string | null;
  postError: string | null;
}

interface ChangeFiledTypePayload {
  key: string;
  value: string | Array;
}

const initialState: WriteState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    initialize: (state) => {
      state = initialState;
    },
    changeField: (
      state,
      { payload }: PayloadAction<ChangeFiledTypePayload>,
    ) => {
      const { key, value } = payload;

      state = state;
      state[key] = value;
    },
    writePost: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    wirtePostSuccess: (state, { payload }: PayLoad<object>) => ({
      ...state,
      post: { _id: payload._id, user: payload.user },
    }),
    writePostError: (state, { payload }: Payload<object>) => ({
      ...state,
      postError: payload,
    }),
  },
});

export const {
  initialize,
  changeField,
  writePost,
  wirtePostSuccess,
  writePostError,
} = writeSlice.actions;
export default writeSlice.reducer;
