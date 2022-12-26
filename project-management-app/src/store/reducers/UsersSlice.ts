import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types';
import { getUsers } from '../thunks/UsersThunks';

interface UsersState {
  users: IUser[];
  isPending: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  isPending: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(getUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
      state.isPending = false;
      state.error = '';
      state.users = action.payload;
    });

    builder.addCase(getUsers.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
