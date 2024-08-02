import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';
import { contactsApi } from './api';

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
