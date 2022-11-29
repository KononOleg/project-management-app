import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BoardsService from '../../service/BoardsService';

import { AxiosErrorDataType } from '../../types/api';

export const getBoards = createAsyncThunk('boards/getBoards', async (_, thunkAPI) => {
  try {
    const response = await BoardsService.getBoards();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const createBoard = createAsyncThunk(
  'boards/createBoards',
  async (payload: { owner: string; title: string }, thunkAPI) => {
    try {
      await BoardsService.createBoard(payload.title, payload.owner);
      const response = await BoardsService.getBoards();
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: string, thunkAPI) => {
  try {
    await BoardsService.deleteBoard(id);
    const response = await BoardsService.getBoards();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;
      return thunkAPI.rejectWithValue(data.message);
    }
  }
});

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      const boardResponse = await BoardsService.getBoard(payload.id);
      await BoardsService.updateBoard({ ...boardResponse.data, title: payload.title });
      const response = await BoardsService.getBoards();
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);
