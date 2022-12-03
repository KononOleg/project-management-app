import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types';
import { createTask, getTasks } from '../thunks/TasksThunks';

interface TasksState {
  tasks: ITask[];
  isPending: boolean;
  error: string;
}

const initialState: TasksState = {
  tasks: [],
  isPending: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(getTasks.fulfilled.type, (state, action: PayloadAction<ITask[]>) => {
      state.isPending = false;
      state.error = '';
      state.tasks = [...state.tasks, ...action.payload];
    });

    builder.addCase(getTasks.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });

    builder.addCase(createTask.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(createTask.fulfilled.type, (state, action: PayloadAction<ITask>) => {
      state.isPending = false;
      state.error = '';
      state.tasks = [...state.tasks, action.payload];
    });

    builder.addCase(createTask.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default tasksSlice.reducer;
