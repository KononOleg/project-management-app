import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../service/AuthService';
import { AxiosErrorDataType } from '../../types/api';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: { login: string; password: string }, thunkAPI) => {
    try {
      const response = await AuthService.signIn(payload.login, payload.password);
      localStorage.setItem('token', response.data.token);
      const user = localStorage.getItem('user');
      return user;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        alert(data.message);
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: { name: string; login: string; password: string }, thunkAPI) => {
    try {
      const singUpRes = await AuthService.signUp(payload.name, payload.login, payload.password);
      const signInRes = await AuthService.signIn(payload.login, payload.password);
      localStorage.setItem('token', signInRes.data.token);
      localStorage.setItem('user', { ...singUpRes.data } as unknown as string);
      return singUpRes.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        alert(data.message);
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);
