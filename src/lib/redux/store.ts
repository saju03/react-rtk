import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slice/userSlice';
import { apiSlice } from './api/apiSlice';

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (err) {
    // Handle errors silently
  }
};

const store = configureStore({
  reducer: {
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState: {
    user: loadState()
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.DEV,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState().user);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;