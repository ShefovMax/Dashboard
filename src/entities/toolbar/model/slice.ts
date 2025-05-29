import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToolbarState, Tool } from './types';

const initialState: ToolbarState = {
  tool: 'pen',
  color: '#000',
  lineWidth: 10,
  fontSize: 14
};

const toolbarSlice = createSlice({
  name: 'Toolbar',
  initialState,
  reducers: {
    changeTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload;
    },
    changeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    changeLineWidth: (state, action: PayloadAction<number>) => {
      state.lineWidth = action.payload;
    },
    changeFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    }
  }
});

export const { changeTool, changeColor, changeFontSize, changeLineWidth } = toolbarSlice.actions;
export default toolbarSlice.reducer;
