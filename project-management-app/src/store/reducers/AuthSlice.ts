import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types';
import { checkIsAuth, signIn, signUp, updateUser } from '../thunks/AuthThunks';

interface AuthState {
  user: IUser | null;
  isPending: boolean;
  isAuth: boolean;
  error: number | null;
}

const initialState: AuthState = {
  user: null,
  isPending: false,
  isAuth: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.isAuth = false;
      state.user = null;
      state.isPending = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(signIn.fulfilled.type, (state, action: PayloadAction<IUser>) => {
      state.isAuth = true;
      state.isPending = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected.type, (state, action: PayloadAction<number>) => {
      state.isAuth = false;
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isAuth = false;
      state.isPending = true;
    });
    builder.addCase(signUp.fulfilled.type, (state, action: PayloadAction<IUser>) => {
      state.isAuth = true;
      state.isPending = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected.type, (state, action: PayloadAction<number>) => {
      state.isAuth = false;
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(checkIsAuth.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(checkIsAuth.fulfilled.type, (state, action: PayloadAction<IUser>) => {
      state.isAuth = true;
      state.isPending = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(checkIsAuth.rejected.type, (state, action: PayloadAction<number>) => {
      state.isAuth = false;
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(updateUser.pending.type, (state) => {
      state.error = null;
      state.isPending = true;
    });
    builder.addCase(updateUser.fulfilled.type, (state, action: PayloadAction<IUser>) => {
      state.isPending = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected.type, (state, action: PayloadAction<number>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
