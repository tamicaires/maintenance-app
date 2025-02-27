import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { themeReducer } from "./features/theme-settings";
import { authReducer } from "./features/auth";
import { membershipReducer } from "./features/membership";
import { loaderReducer } from "./features/loader";
import { notificationReducer } from "./features/notification-card";

const store = configureStore({
  reducer: {
    themeSettings: themeReducer,
    auth: authReducer,
    membership: membershipReducer,
    loader: loaderReducer,
    notification: notificationReducer
  },
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
