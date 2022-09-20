import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import camraReducer from '../reducer/camraSlice';

export const store = configureStore({
  reducer: {
    camra: camraReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
