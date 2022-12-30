import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, ITaskList } from '../../types';
import { createTask, getTasks, updateTask } from '../thunks/TasksThunks';

interface TasksState {
  tasks: ITaskList[];
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
  reducers: {
    setTasks(state, action: PayloadAction<ITaskList>) {
      const columnId = action.payload.columnId;
      const taskListIndex = state.tasks.findIndex((task) => task.columnId === columnId);
      state.tasks[taskListIndex].tasks = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(getTasks.fulfilled.type, (state, action: PayloadAction<ITaskList>) => {
      state.isPending = false;
      state.error = '';

      state.tasks = [...state.tasks, action.payload];
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
      state.tasks
        .find((task) => task.columnId === action.payload.columnId)
        ?.tasks.push(action.payload);
    });

    builder.addCase(createTask.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(updateTask.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(updateTask.fulfilled.type, (state, action: PayloadAction<ITask>) => {
      state.isPending = false;
      state.error = '';

      const taskListIndex = state.tasks.findIndex(
        (taskList) => taskList.columnId === action.payload.columnId ////////////////////////ИСПРАВИТЬ
      );
      const taskIndex = state.tasks[taskListIndex].tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      state.tasks[taskListIndex].tasks[taskIndex] = action.payload;
    });

    builder.addCase(updateTask.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default tasksSlice.reducer;
export const { setTasks } = tasksSlice.actions;
