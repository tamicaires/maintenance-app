import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/theme-settings";

const store = configureStore({
  reducer: { themeSettings: themeReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
