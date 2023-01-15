import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../types';
import { updateFile } from '../thunks/FilesThunks';

interface FilesState {
  files: IFile[];
  isPending: boolean;
  error: string;
}

const initialState: FilesState = {
  files: [],
  isPending: false,
  error: '',
};

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateFile.pending.type, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateFile.fulfilled.type, (state, action: PayloadAction<IFile>) => {
      state.isPending = false;
      state.error = '';

      const findIndex = state.files.findIndex((file) => file._id === action.payload._id);
      findIndex !== -1
        ? (state.files[findIndex].file = action.payload.file)
        : state.files.push(action.payload);
      console.log(state.files);
    });
    builder.addCase(updateFile.rejected.type, (state, action: PayloadAction<string>) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default filesSlice.reducer;
