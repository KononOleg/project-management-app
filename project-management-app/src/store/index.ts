import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import BoardSlice from './reducers/BoardSlice';
import BoardsSlice from './reducers/BoardsSlice';
import TasksSlice from './reducers/TasksSlice';
import UsersSlice from './reducers/UsersSlice';

const store = configureStore({
  reducer: { AuthReducer, BoardsSlice, BoardSlice, TasksSlice, UsersSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
