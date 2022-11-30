import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

interface BoardState {
  board: IBoard | null;
  isPending: boolean;
  error: string;
}

const initialState: BoardState = {
  board: null,
  isPending: false,
  error: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
