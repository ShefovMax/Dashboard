// features/canvas/model/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { CanvasElement } from './types';

interface CanvasState {
  elements: CanvasElement[];
  selectedElementId: string | null;
}

const initialState: CanvasState = {
  elements: [],
  selectedElementId: null
};

const canvasSlice = createSlice({
  name: 'Canvas',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<CanvasElement>) => {
      state.elements.push(action.payload);
    },
    updateElement: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<CanvasElement> }>
    ) => {
      const index = state.elements.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.elements[index] = {
          ...state.elements[index],
          ...action.payload.changes
        };
      }
    },
    setElements: (state, action: PayloadAction<CanvasElement[]>) => {
      state.elements = action.payload;
    }
  }
});

export const { addElement, updateElement, setElements } = canvasSlice.actions;
export default canvasSlice.reducer;
