import { configureStore } from '@reduxjs/toolkit';

import canvas from '@entities/canvas/model/slice';
import toolbar from '@entities/toolbar/model/slice';

export const store = configureStore({
  reducer: { canvas, toolbar }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
