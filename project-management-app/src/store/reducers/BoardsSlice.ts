import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../types';
import { createBoard, deleteBoard, getBoards } from '../thunks/BoardsThunks';

interface boardsSlice {
  boards: IBoard[];
  isPending: boolean;
  error: number | null;
}

const initialState: boardsSlice = {
  boards: [],
  isPending: false,
  error: null,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(getBoards.fulfilled.type, (state, action: PayloadAction<IBoard[]>) => {
      state.isPending = false;
      state.error = null;
      state.boards = action.payload;
    });

    builder.addCase(getBoards.rejected.type, (state, action: PayloadAction<number>) => {
      state.isPending = false;
      state.error = action.payload;
    });

    builder.addCase(createBoard.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(createBoard.fulfilled.type, (state, action: PayloadAction<IBoard[]>) => {
      state.isPending = false;
      state.error = null;
      state.boards = action.payload;
    });

    builder.addCase(createBoard.rejected.type, (state, action: PayloadAction<number>) => {
      state.isPending = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBoard.pending.type, (state) => {
      state.isPending = true;
    });

    builder.addCase(deleteBoard.fulfilled.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = null;
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    });

    builder.addCase(deleteBoard.rejected.type, (state, action: PayloadAction<number>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default boardsSlice.reducer;
