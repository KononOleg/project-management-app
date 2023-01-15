import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosErrorDataType } from '../../types/api';

export const updateFile = createAsyncThunk(
  'files/updateFile',
  async (payload: { _id: string; file: string }, thunkAPI) => {
    try {
      /////////Files Service Update
      return payload;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);
