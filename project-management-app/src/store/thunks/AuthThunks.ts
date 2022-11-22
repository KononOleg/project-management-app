import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../service/AuthService';
import UserService from '../../service/UserService';
import { AxiosErrorDataType } from '../../types/api';
import jwt_decode from 'jwt-decode';
import { IToken } from '../../types';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: { login: string; password: string }, thunkAPI) => {
    try {
      const response = await AuthService.signIn(payload.login, payload.password);
      localStorage.setItem('token', response.data.token);
      const tokenData: IToken = jwt_decode(response.data.token);
      const userResponse = await UserService.getUser(tokenData.id);
      return userResponse.data;
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
