import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '@/features/settings/slice';
import gridReducer from '@/features/grid/slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    gridState: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
