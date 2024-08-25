import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectThemeSettings = createDraftSafeSelector(
  (state: RootState) => state.themeSettings,
  (themeSettings) => themeSettings.theme
);
