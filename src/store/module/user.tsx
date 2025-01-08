import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: string | null;
  token: string | null;
  checkError: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  checkError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    temSetUser: (state, { payload }: PayloadAction<string>) => {
      state.user = payload;
    },
    checkSuccess: (state, { payload }: PayloadAction<string>) => {
      state.user = payload.user;
      state.token = payload.token;
      state.checkError = null;
    },
    checkFailure: (state, { payload }: PayloadAction<string>) => {
      state = { ...initialState };
      state.checkError = payload;
    },
  },
});

export const { temSetUser, checkSuccess, checkFailure } = userSlice.actions;
export default userSlice.reducer;
