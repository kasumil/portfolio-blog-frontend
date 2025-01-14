import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: string | null;
  token: string | null;
  checkError: string | null;
}

const initialState: UserState = {
  user: null,
  checkError: null,
};

const loginStorageRemove: void = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
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
      state.checkError = null;
    },
    checkFailure: (state, { payload }: PayloadAction<string>) => {
      state.user = initialState.user;
      state.checkError = payload;
      loginStorageRemove();
    },
    userLogOut: (state) => {
      state = state;
      state.user = null;
      loginStorageRemove();
    },
  },
});

export const { temSetUser, checkSuccess, checkFailure, userLogOut } =
  userSlice.actions;
export default userSlice.reducer;
