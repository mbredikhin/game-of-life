import { configureStore } from '@reduxjs/toolkit';
import { settingsReducer } from '@/entities/settings';
import { gridReducer } from '@/entities/grid';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    gridState: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
