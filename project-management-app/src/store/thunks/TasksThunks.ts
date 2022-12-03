import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosErrorDataType } from '../../types/api';
import TasksService from '../../service/TasksService';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (payload: { boardId: string; columnId: string }, thunkAPI) => {
    try {
      const response = await TasksService.getTasks(payload.boardId, payload.columnId);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (
    payload: {
      boardId: string;
      columnId: string;
      title: string;
      order: number;
      description: string;
      userId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await TasksService.createTask(
        payload.boardId,
        payload.columnId,
        payload.title,
        payload.order,
        payload.description,
        payload.userId
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;
        return thunkAPI.rejectWithValue(data.message);
      }
    }
  }
);
