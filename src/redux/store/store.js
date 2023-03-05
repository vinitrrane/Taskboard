import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './slice/boardSlice';

export const store = configureStore({
  reducer: {
    boards: boardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
