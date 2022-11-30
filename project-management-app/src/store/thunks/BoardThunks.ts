import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import BoardsService from '../../service/BoardsService';
import { AxiosErrorDataType } from '../../types/api';

export const getBoard = createAsyncThunk('boards/getBoard', async (id: string, thunkAPI) => {
  try {
    const response = await BoardsService.getBoard(id);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});
