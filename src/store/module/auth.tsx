import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Auth State Interface
interface AuthState {
  login: {
    username: string;
    password: string;
  };
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  authError: string | null;
}

// Initial State
const initialState: AuthState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  authError: null,
};

// Payload Interfaces
interface ChangeFieldPayload {
  form: keyof AuthState; // 'login' | 'register'
  key: keyof AuthState['login'] | keyof AuthState['register']; // Field key
  value: string;
}

interface InitializeFormPayload {
  form: keyof AuthState; // 'login' | 'register'
}

// Slice Definition
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeField: (state, { payload }: PayloadAction<ChangeFieldPayload>) => {
      const { form, key, value } = payload;
      // Directly update the specific field
      state[form][key] = value;
    },
    initializeForm: (
      state,
      { payload }: PayloadAction<InitializeFormPayload>,
    ) => {
      // Reset the specified form to its initial state
      state[payload] = { ...initialState[payload] };
      state.authError = null;
    },
    registerSuccess: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      authError: null,
    }),
    registerFailure: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      authError: payload,
    }),
    loginSuccess: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      authError: null,
      auth: payload.user,
    }),
    loginFailure: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      authError: payload,
    }),
    logout: (state) => {
      // Reset only login fields
      state.login = { ...initialState.login };
    },
  },
});

// Export Actions and Reducer
export const {
  changeField,
  initializeForm,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
