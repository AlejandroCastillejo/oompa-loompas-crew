import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
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

const mainPersistConfig = {
  key: "main",
  storage,
};

const detailPersistConfig = {
  key: "detail",
  storage,
};

const persistedMainReducer = persistReducer(mainPersistConfig, mainReducer);

// export default configureStore({
//   reducer: {
//     main: mainReducer,
//   },
// });

export const store = configureStore(
  {
    reducer: {
      main: persistedMainReducer,
      // main: mainReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  }
  // applyMiddleware(thunk)
);

export const persistor = persistStore(store);
