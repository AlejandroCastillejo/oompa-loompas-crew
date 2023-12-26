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

// export default configureStore({
//   reducer: {
//     main: mainReducer,
//   },
// });

export const store = configureStore(
  {
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
  }
  // applyMiddleware(thunk)
);

export const persistor = persistStore(store);
