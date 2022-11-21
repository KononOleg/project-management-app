import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';

const store = configureStore({
  reducer: { AuthReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
