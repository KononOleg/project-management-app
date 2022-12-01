import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import BoardsService from '../../service/BoardsService';
import { AxiosErrorDataType } from '../../types/api';
import BoardService from '../../service/BoardService';

export const getBoard = createAsyncThunk('board/getBoard', async (id: string, thunkAPI) => {
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

export const getColumns = createAsyncThunk('board/getColumns', async (id: string, thunkAPI) => {
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

export const createColumn = createAsyncThunk(
  'board/createColumn',
  async (payload: { boardId: string; titleColumn: string }, thunkAPI) => {
    try {
      const response = await BoardService.createColumn(payload.boardId, payload.titleColumn, 0);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async (payload: { boardId: string; columnId: string }, thunkAPI) => {
    try {
      await BoardService.deleteColumn(payload.boardId, payload.columnId);
      const response = await BoardService.getColumns(payload.boardId);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const updateColumn = createAsyncThunk(
  'board/updateColumn',
  async (
    payload: { boardId: string; columnId: string; titleColumn: string; orderColumn: number },
    thunkAPI
  ) => {
    try {
      await BoardService.updateColumn(
        payload.boardId,
        payload.columnId,
        payload.titleColumn,
        payload.orderColumn
      );
      const response = await BoardService.getColumns(payload.boardId);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);
