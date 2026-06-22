// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./mainreducer";

export const store = configureStore({
  reducer: rootReducer,
  // Thunk is included automatically
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;