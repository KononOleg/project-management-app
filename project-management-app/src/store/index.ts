import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import BoardsSlice from './reducers/BoardsSlice';

const store = configureStore({
  reducer: { AuthReducer, BoardsSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
