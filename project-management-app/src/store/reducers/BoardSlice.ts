import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IColumn } from '../../types';
import { getBoard, getColumns } from '../thunks/BoardThunks';

interface BoardState {
  board: IBoard | null;
  columns: IColumn[] | null;
  isPending: boolean;
  error: string;
}

const initialState: BoardState = {
  board: null,
  columns: null,
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
  },
});

export default boardSlice.reducer;
