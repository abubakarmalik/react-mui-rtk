import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todosSlice from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

//------------------- Types---------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
