import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IColumn } from '../../types';
import {
  createColumn,
  deleteColumn,
  getBoard,
  getColumns,
  updateColumn,
} from '../thunks/BoardThunks';

interface BoardState {
  board: IBoard | null;
  columns: IColumn[];
  isPending: boolean;
  error: string;
}

const initialState: BoardState = {
  board: null,
  columns: [],
  isPending: false,
  error: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoard.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(getBoard.fulfilled.type, (state, action: PayloadAction<IBoard>) => {
      state.board = action.payload;
      state.isPending = false;
      state.error = '';
    });
    builder.addCase(getBoard.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(getColumns.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(getColumns.fulfilled.type, (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
      state.isPending = false;
      state.error = '';
    });
    builder.addCase(getColumns.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(createColumn.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(createColumn.fulfilled.type, (state, action: PayloadAction<IColumn>) => {
      state.columns = [...state.columns, action.payload];
      state.isPending = false;
      state.error = '';
    });
    builder.addCase(createColumn.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(deleteColumn.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteColumn.fulfilled.type, (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
      state.isPending = false;
      state.error = '';
    });
    builder.addCase(deleteColumn.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(updateColumn.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateColumn.fulfilled.type, (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
      state.isPending = false;
      state.error = '';
    });
    builder.addCase(updateColumn.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default boardSlice.reducer;
