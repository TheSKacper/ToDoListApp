import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../reducer/taskSlice';

export const store = configureStore({
  reducer: {
    task: taskSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
