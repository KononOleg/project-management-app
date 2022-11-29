import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BoardsService from '../../service/BoardsService';
import { IToken } from '../../types';
import { AxiosErrorDataType } from '../../types/api';
import jwt_decode from 'jwt-decode';

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
  async (title: string, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const tokenData: IToken = jwt_decode(token as string);
      await BoardsService.createBoard(title, tokenData.id);
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
