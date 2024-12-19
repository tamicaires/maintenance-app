import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { themeReducer } from "./features/theme-settings";
import { authReducer } from "./features/auth";
import { membershipReducer } from "./features/membership";
import { loaderReducer } from "./features/loader";

const store = configureStore({
  reducer: { themeSettings: themeReducer, auth: authReducer, membership: membershipReducer, loader: loaderReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
