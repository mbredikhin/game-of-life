import { configureStore } from '@reduxjs/toolkit';

import { gridReducer } from '@/entities/grid';
import { settingsReducer } from '@/entities/settings';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    gridState: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
