import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import { persistReducer, persistStore } from "redux-persist";

//slices
import userSlice from "../features/userSlice";

//saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user", ["user"]);

//persist config
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
});

const persisReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
