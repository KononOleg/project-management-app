import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import UserService from '../../service/UserService';
import { AxiosErrorDataType } from '../../types/api';

export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
  try {
    const response = await UserService.getUsers();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});
