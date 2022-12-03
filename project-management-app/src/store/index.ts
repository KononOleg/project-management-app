import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import BoardSlice from './reducers/BoardSlice';
import BoardsSlice from './reducers/BoardsSlice';
import TasksSlice from './reducers/TasksSlice';

const store = configureStore({
  reducer: { AuthReducer, BoardsSlice, BoardSlice, TasksSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
