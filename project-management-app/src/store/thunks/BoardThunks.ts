import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import BoardsService from '../../service/BoardsService';
import { AxiosErrorDataType } from '../../types/api';
import BoardService from '../../service/BoardService';

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

export const getColumns = createAsyncThunk('boards/getColumns', async (id: string, thunkAPI) => {
  try {
    const response = await BoardService.getColumns(id);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});
