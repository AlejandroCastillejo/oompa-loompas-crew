import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { mainReducer } from "./main-slice";
import { detailReducer } from "./detail-slice";

const mainPersistConfig = {
  key: "main",
  storage,
};
const detailPersistConfig = {
  key: "detail",
  storage,
};

const persistedMainReducer = persistReducer(mainPersistConfig, mainReducer);
const persistedDetailReducer = persistReducer(
  detailPersistConfig,
  detailReducer
);

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: {
      main: persistedMainReducer,
      detail: persistedDetailReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  });

export const store = setupStore({});

export const persistor = persistStore(store);
