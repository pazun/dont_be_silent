import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterReducer';
import { quotesApi } from './quotesApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesApi.middleware),
});