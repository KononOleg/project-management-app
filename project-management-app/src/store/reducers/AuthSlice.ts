import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types';
import { signIn, signUp } from '../thunks/AuthThunks';

interface AuthState {
  user: IUser | null;
  isPending: boolean;
  isAuth: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  isPending: false,
  isAuth: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.isPending = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.isAuth = true;
      state.isPending = false;
      state.error = '';
      state.user = action.payload;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.isPending = false;
      state.error = action.payload;
    },
    [signUp.pending.type]: (state) => {
      state.isAuth = false;
      state.isPending = true;
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<IUser | null>) => {
      state.isAuth = true;
      state.isPending = false;
      state.error = '';
      state.user = action.payload;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.isPending = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
