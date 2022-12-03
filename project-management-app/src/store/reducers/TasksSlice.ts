import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types';

interface BoardState {
  tasks: ITask[];
  isPending: boolean;
  error: string;
}

const initialState: BoardState = {
  tasks: [],
  isPending: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default tasksSlice.reducer;
